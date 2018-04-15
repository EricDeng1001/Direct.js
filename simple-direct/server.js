/*
this file wiil be called in the project/ dir
so path.resolve("./") represent the root of the project
which looks like
/src
/public
/src/Server
/node_modules
*/
const fs = require("fs");
const path = require("path");

const express = require("express");
const https = require("https");
const http = require("http");
const SocketSever = require("socket.io");

const bodyParser = require("body-parser");
const session = require("express-session");
const compression = require("compression");

const mongoose = require("mongoose");

const userServerCodeRequire = name => require( path.resolve( "./src/Server" , name ) );

userServerCodeRequire("./Config/models.js");

const serverConfig = userServerCodeRequire("./Config/server");

const jsonToUrlencoded = require("direct-core/Algorithm/jsonToUrlencoded");

const publicBase = path.resolve("./public");

const sessionMiddleWare = session( serverConfig.session );

//mongodb connection
{
  let { username , password , host , port , database , options } = userServerCodeRequire("./Config/database");
  let connection = "mongodb://";
  if( username ){
    connection += username + ":" + password + "@";
  }
  connection += host;
  if( port ){
    connection += ":"  + port;
  }

  connection += "/" + database;
  if( options ){
    connection += "?" + jsonToUrlencoded( options );
  }
  mongoose.connect( connection , e => {
    if( e ){
      console.log( "unable to connect to your mongod" );
      console.log( "running server without database" );
    }
  });
}

const app = express();

app.use( bodyParser.json({ strict: false }) );
app.use( compression() );
app.use( sessionMiddleWare );
for( let mw of serverConfig.middleWares ){
  app.use( mw );
}

//below for client-routing
app.get( "*" , ( req , res ) => {
  fs.stat( publicBase + req.path , ( err , stat ) => {
    if( stat && stat.isFile() ){
      return res.sendFile( publicBase + req.path );
    }
    res.sendFile( publicBase + "/index.html" );
  })
});

const routes = userServerCodeRequire("./Config/routes");

const urls = Object.keys( routes );

for( let url of urls ){
  if( !url.method ){
    app.post( "/api" + url , ( req , res , next ) => {
      routes[url].api({ req , res , next });
    });
  } else {
    app[routes[url].method]( "/api" + url , ( req , res , next ) => {
      routes[url].api({ req , res , next });
    });
  }
}

var server;
if( serverConfig.https ){
  var ca;
  try {
    ca = fs.readFileSync( path.resolve( serverConfig.caFile ) )
  } catch( e ){
    console.log( "unable to find your CA file:" , e );
  }
  server = https.createServer({
    ca,
    key: fs.readFileSync( path.resolve( serverConfig.keyFile ) ),
    cert: fs.readFileSync( path.resolve( serverConfig.certFile ) ),
    passphrase: serverConfig.passphrase
  } , app );
} else {
  server = http.createServer( app );
}

const socketServer = new SocketSever( server );
socketServer.use( ( socket , next ) => {
  sessionMiddleWare( socket.request , socket.request.res , next );
});

for( let mw of serverConfig.socketMiddleWares ){
  socketServer.use( mw );
}

userServerCodeRequire("./socketServer")( socketServer );

server.listen( serverConfig.port );

if( serverConfig.https && serverConfig.redirectToHttps ){
  http.createServer( ( req , res ) => {
    res.writeHead( 301 , {
      Location: `https://${req.headers.host}${req.url}`
    });
    res.end();
  }).listen( 80 );
}
