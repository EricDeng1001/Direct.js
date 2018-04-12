#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
var program = require("commander");
const npm = require("npm");
const package = require("./package.json");

program
  .version( package.version )
  .arguments("<task>")
  .action( task => {
    console.log(`direct version ${package.version}`);
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
