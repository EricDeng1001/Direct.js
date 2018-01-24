const fs = require('fs');
const path = require('path');

const express = require('express');
const https = require('https');
const io = require("socket.io");

const bodyParser = require('body-parser');
const session = require("express-session");

const mongoose = require("mongoose");

const userServerCodeRequire = ( name ) => require( path.resolve( './src/Server' , name ) );

userServerCodeRequire('./Config/models.js');

const serverConfig = userServerCodeRequire('./Config/server');

const jsonToUrlencoded = require('renext-core/Algorithm/jsonToUrlencoded');

const app = express();

const publicBase = path.resolve( './public' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}));

const sessionMiddleWare = session( serverConfig.session );

app.use( sessionMiddleWare );

app.get( '*' , ( req , res )  => {
  fs.stat( publicBase + req.path , ( err , stat ) => {
    if( stat && stat.isFile() ){
      return res.sendFile( publicBase + req.path );
    }
    res.sendFile( publicBase + '/index.html' );
  })
});

//mongodb connection
{
  let { username , password , host , port , database , options } = userServerCodeRequire('./Config/database');
  let connection = 'mongodb://';
  if( username ){
    connection += username + ':' + password + '@';
  }
  connection += host;
  if( port ){
    connection += ':'  + port;
  }
  connection += '/' + database;
  if( options ){
    connection += '?' + jsonToUrlencoded( options );
  }
  mongoose.connect( connection );
}

//redis connection


const routes = userServerCodeRequire('./Config/routes');

const urls = Object.keys( routes );

for( let url of urls ){
  if( !url.method ){
    app.post( url , ( req , res , next ) => routes[url].api({ req , res , next }) );
  } else {
    app[routes[url].method]( url , ( req , res , next ) => routes[url].api({ req , res , next }) );
  }
}

var server;
if( serverConfig.https ){
  server = https.createServer({
    key: fs.readFileSync( path.resolve( "./src/Server/Config/key.pem" ) ),
    cert: fs.readFileSync( path.resolve( "./src/Server/Config/cert.pem" ) ),
    passphrase: serverConfig.passphrase
  } , app );
} else {
  server = app;
}
const socketServer = new io( server );
socketServer.use( ( socket , next ) => {
  sessionMiddleWare( socket.request , socket.request.res , next );
});

userServerCodeRequire("./socketServer")( socketServer );

server.listen( serverConfig.port );
