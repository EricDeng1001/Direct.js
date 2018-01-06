#!env node
const fs = require('fs');
const path = require('path');
var program = require('commander');

program
  .version('0.0.1')
  .arguments("<projectName>")
  .action( projectName => {
    fs.stat( projectName , ( err , result ) => {
      if( err ){
        fs.mkdirSync( path.resolve( './' , projectName ) );
        copyDir( __dirname + '/resources' , path.resolve( './' , projectName ) );
      }
      else {
        console.log( projectName + " already exist");
        console.log( projectName + " is a file");
      }
    })
  })
  .parse( process.argv );

function copyDir( src , dest ){
  const files = fs.readdirSync( src );
  for( let i = 0 ; i < files.length ; i++ ){
    if( fs.statSync( src + '/' + files[i] ).isDirectory() ){
      fs.mkdirSync( dest + '/' + files[i]  );
      copyDir( src + '/' + files[i] , dest + '/' + files[i] );
    }
    else {
      fs.copyFile( src + '/' + files[i] , dest + '/' + files[i] , () =>{
        console.log( 'creating ' + src + '/' + files[i] );
      });
    }
  }
}
