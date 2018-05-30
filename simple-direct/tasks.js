#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var program = require("commander");
var npm = require("npm");
var package = require("./package.json");

program
  .version( package.version )
  .arguments("<task>")
  .action( task => {
    console.log(`direct version ${package.version}`);
    switch( task ){
      case "openDev":
        process.chdir( __dirname );
        npm.load( $ => {
          npm.commands.run( [task] );
        });
        break;
      case "dev":
      case "build":
        process.chdir( __dirname );
        npm.load( $ => {
          npm.commands.run( [task] );
        });
        fs.copyFile( "../../src/Frontend/Core/manifest.json", "../../public/manifest.json", $ => $ );
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
        require("./Server/server");
        setTimeout( () => {
          fs = null;
          path = null;
          program = null;
          npm = null;
          package = null;
          cleanFile = null;
          console.log("whole server bootstrap succeed, booster exiting...exited");
        }, 2000 );
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
