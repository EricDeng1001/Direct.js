#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");
const version = require("./package.json").version;
const copyDir = require("./Algorithm/copyDir");

program
  .version( version )
  .arguments("<name>")
  .action( name => {
    fs.stat( name , ( err , result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( "./" , name ) );
        copyDir( __dirname + "/Resources/ui" , path.resolve( "./" , name )  , "" );
      }
      else {
        console.log( name + " already exist");
      }
    })
  })
  .parse( process.argv );
