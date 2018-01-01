const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const apiKeyProtect = require('./Server/HOF/apiKeyProtect');
const apiRequire = ( api ) => require('./Server/api/' + api );
const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}));

const publicBase = __dirname + '/public';
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

require( './Server/api/dbConnection.js' );

const createUser = apiRequire('createUser');
const login = apiRequire('login');

app.post( '/createUser' , ( req , res ) => {
  createUser({
    uid: req.body.uid,
    nickname: req.body.username,
    password: req.body.password,
    onSuccess: () => res.send({ status : 0 }),
    onError: ( err ) => res.send( err )
  });
});

app.post( '/login' , ( req , res ) => {
  login({
    uid: req.body.uid,
    password: req.body.password,
    onSuccess: key => res.send({
      status: 0,
      key
    }),
    onError: err => res.send({
      status: 1,
      error: err.message
    })
  });
});

app.listen( 8080 );
