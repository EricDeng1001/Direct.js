#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");
const npm = require("npm");
const version = require("./package.json").version;
const mergeDir = require("./Algorithm/mergeDir");
const checkConfig = require("./Algorithm/checkConfig");

program
  .version( version )
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName , ( err , result ) => {
      if( err ){
        console.log( projectName + " does not exist");
      }
      else {
        mergeDir( __dirname + "/Resources/app/src/Frontend/Config" , path.resolve( "./" , projectName + "/src/Frontend/Config" )  , "" );
        checkConfig( path.resolve( "./" , projectName + "/src/Frontend/Config" ) , true );
        mergeDir( __dirname + "/Resources/app/src/Server/Config" , path.resolve( "./" , projectName + "/src/Server/Config" )  , "" );
        checkConfig( path.resolve( "./" , projectName + "/src/Frontend/Config" ) , false );
      }
    })
  })
  .parse( process.argv );
