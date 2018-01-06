const fs = require('fs');
const path = require('path');
var program = require('commander');
const execSync = require("child_process").execSync;
const exec = require("child_process").exec;
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
        exec( "npm install renext" , (error, stdout, stderr) => {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
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
      copyDir( src + '/' + files[i] , dest + '/' + files[i] );
    }
    else {
      fs.copyFileSync( src + '/' + files[i] , dest + '/' + files[i] );
      console.log( "created " + files[i] );
    }
  }
}
