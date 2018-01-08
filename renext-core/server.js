const https = require('https');
const express = require('express');
const io = require("socket.io");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

let userServerCodeRequire = ( name ) => require( path.resolve( './src/Server' , name ) );

userServerCodeRequire('./Config/models.js');

const serverConfig = userServerCodeRequire('./Config/server');

const jsonToUrlencoded = require('./Algorithm/jsonToUrlencoded');

const app = express();

const publicBase = path.resolve( './public' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}));

app.all( '*', ( req , res ,next ) => {
  res.header("Access-Control-Allow-Origin","*");
  next();
});

app.get( '*' , ( req , res )  => {
  fs.stat( publicBase + req.path , ( err , stat ) => {
    if( stat && stat.isFile() ){
      return res.sendFile( publicBase + req.path );
    }
    res.sendFile( publicBase + '/index.html' );
  })
});

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

const routes = userServerCodeRequire('./Config/routes');

const urls = Object.keys( routes );

for( let i = 0 ; i < urls.length ; i++ ){
  app.post( urls[i] , ( req , res , next ) => routes[urls[i]]({ req , res , next }) );
}

const httpsServer = https.createServer({
  key: fs.readFileSync( path.resolve( "./src/Server/Config/key.pem" ) ),
  cert: fs.readFileSync( path.resolve( "./src/Server/Config/cert.pem" ) ),
  passphrase: serverConfig.passphrase
} , app );

const socketServer = new io( httpsServer );
userServerCodeRequire("./socketServer")( socketServer );

httpsServer.listen( serverConfig.port );
