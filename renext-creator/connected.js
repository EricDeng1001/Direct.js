#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var program = require("commander");
const copyDir = require("./Algorithm/copyDir");

program
  .version("0.0.1")
  .arguments("<name>")
  .action( name => {
    fs.stat( name , ( err , result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( "./" , name ) );
        copyDir( __dirname + "/Resources/connected" , path.resolve( "./" , name )  , "" );
      }
      else {
        console.log( name + " already exist");
      }
    })
  })
  .parse( process.argv );
