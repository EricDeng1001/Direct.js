const fs = require("fs");

function __load( path ){
  var res;
  const stat = fs.statSync( path );
  if( stat.isDirectory() ){
    res = {};
    let files = fs.readdirSync( path );
    for( let file of files ){
      res[path + "/" + file.split(".")[0]] = __load( path + "/" + file );
    }
  } else if( stat.isFile() ){
    res = require( path );
  }
  return res;
}


module.exports = ( path = "../API" ) => {
  const stat = fs.statSync( path );
  if( !stat.isDirectory() ){
    throw path + " is not a directory";
  }
  return __load( path );
};
