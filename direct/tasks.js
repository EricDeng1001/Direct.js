#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
var program = require('commander');
const npm = require("npm");

program
  .version('0.0.1')
  .arguments("<task>")
  .action( task => {
    switch( task ){
      case "dev":
      case "build":
        process.chdir( __dirname );
        npm.load( () => {
          npm.commands.run( [task] );
        });
        break;
      case "cleanCache":
        try {
          fs.rmdirSync( __dirname + "/node_modules/.cache" );
        } catch( e ){
          //...
          console.log( e );
        }
        break;
      case "server":
        require("./server");
        break;
      default:
        console.log("unknown task");
    }
  })
  .parse( process.argv );
