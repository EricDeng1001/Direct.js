#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
var program = require('commander');
const npm = require("npm");

program
  .version('0.0.1')
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName , ( err , result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( './' , projectName ) );
        copyDir( __dirname + '/resources' , path.resolve( './' , projectName )  , "" );
        process.chdir( projectName );
        npm.load( () => {
          npm.commands.init( () => {
            console.log(" ----- start install renext ----");
            npm.commands.install( ["renext@latest"] , ( err , data ) => {
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

function copyDir( src , dest , path ){
  const files = fs.readdirSync( src );
  for( let i = 0 ; i < files.length ; i++ ){
    if( fs.statSync( src + '/' + files[i] ).isDirectory() ){
      fs.mkdirSync( dest + '/' + files[i]  );
      console.log( "created " + path + '/' + files[i] );
      copyDir( src + '/' + files[i] , dest + '/' + files[i] , path + '/' + files[i] );
    }
    else {
      fs.copyFileSync( src + '/' + files[i] , dest + '/' + files[i] );
      console.log( "created " + path + '/' + files[i] );
    }
  }
}
