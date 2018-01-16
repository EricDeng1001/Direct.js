module.exports = function copyDir( src , dest , path ){
  const files = fs.readdirSync( src );
  for( let i = 0 ; i < files.length ; i++ ){
    if( fs.statSync( src + "/" + files[i] ).isDirectory() ){
      fs.mkdirSync( dest + "/" + files[i]  );
      console.log( "created " + path + "/" + files[i] );
      copyDir( src + "/" + files[i] , dest + "/" + files[i] , path + "/" + files[i] );
    }
    else {
      fs.copyFileSync( src + "/" + files[i] , dest + "/" + files[i] );
      console.log( "created " + path + "/" + files[i] );
    }
  }
}
