const fs = require("fs");
module.exports = function mergeDir( src , dest , path ){
  const files = fs.readdirSync( src );
  for( let i = 0 ; i < files.length ; i++ ){
    if( fs.statSync( src + "/" + files[i] ).isDirectory() ){
      try {
        fs.statSync( src + "/" + files[i] )
      } catch( e ){
        fs.mkdirSync( dest + "/" + files[i] );
      }
      mergeDir( src + "/" + files[i] , dest + "/" + files[i] , path + "/" + files[i] );
      console.log( "merged " + path + "/" + files[i] );
    }
    else {
      try {
        if( fs.statSync( dest + "/" + files[i] ).isFile() ){
          continue;
        }
      } catch ( e ) {
        fs.copyFileSync( src + "/" + files[i] , dest + "/" + files[i] );
        console.log( "created " + path + "/" + files[i] );
      }
    }
  }
}
