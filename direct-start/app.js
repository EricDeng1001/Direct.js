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
    fs.stat( projectName , ( err , result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( "./" , projectName ) );
        copyDir( __dirname + "/Resources/app" , path.resolve( "./" , projectName )  , "" );
        process.chdir( projectName );
        npm.load( () => {
          npm.commands.init( () => {
            console.log(" ----- start install direct ----");
            npm.commands.install( ["simple-direct@latest"] , ( err , data ) => {
              console.log(" ------- installed completed! ------");
              console.log(
                `--------------------------------------------------------------------------------\n
                  run\n
                  npm install direct-animation\n
                  to install animation lib for direct\n
                  npm install direct-algorithm\n
                  to install a lot of useful algorithm\n
                  npm install direct-datastructure\n
                  to install a lot of useful datastructure\n
                  npm install direct-wrapper\n
                  to install a lot of useful wrapper\n
                  and more...\n
                  see [url]
                `
              );
              // in some windows os
              // this tool will not exited as wished
              process.exit();
              //so we force it to exit
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
