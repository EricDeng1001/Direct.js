#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const program = require("commander");
const version = require("./package.json").version;
const npm = require("npm");

const copyDir = require("./Algorithm/copyDir");

program
  .version( version )
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName, ( err, result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( "./", projectName ) );
        copyDir( __dirname + "/arch/basic", path.resolve( "./", projectName ), "" );
        process.chdir( projectName );
        npm.load( () => {
          npm.commands.init( () => {
            console.log(" ----- start install direct ----");
            npm.commands.install( ["simple-direct@latest"], ( err, data ) => {
              console.log(" ------- installed completed! ------");
            });
          });
        })
      }
      else {
        console.log( projectName + " already exist");
      }
    })
  })
  .parse( process.argv );
