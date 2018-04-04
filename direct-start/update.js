#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var program = require("commander");
const npm = require("npm");

const mergeDir = require("./Algorithm/mergeDir");

program
  .version("0.0.1")
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName , ( err , result ) => {
      if( err ){
        console.log( projectName + " does not exist");
      }
      else {
        mergeDir( __dirname + "/Resources/app" , path.resolve( "./" , projectName )  , "" );
      }
    })
  })
  .parse( process.argv );
