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
          cleanFile( __dirname + "/node_modules/.cache" );
          console.log( "clean finised" );
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


function cleanFile( path ){
  const files = fs.readdirSync( path );
  for( let i = 0 ; i < files.length ; i++ ){
    if( fs.statSync( path + "/" + files[i] ).isDirectory() ){
      cleanFile( path + "/" + files[i]  );
      console.log( "cleaned " + path + "/" + files[i] );
    }
    else {
      fs.unlinkSync( path + "/" + files[i] );
      console.log( "removed " + path + "/" + files[i] );
    }
  }
}
