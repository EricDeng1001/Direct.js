/*
this file is under consturction
05-04-2018 23:42
*/
const fs = require("fs");
const mergeObject = require("./mergeObject");

`${__dirname}/../Resources/app/src/Server/Config/${file}`

const getStandardFrontendConfig = file => {
  //
};
const getStandardServerConfig = file => {

};

module.exports = function( path , isF ){
  const files = fs.readdirSync( path );
  for( let file of files ){
    if( isF ){
      let { head , standardFrontendConfig } = getStandardFrontendConfig( file );
      let userConfig = require( file );
      mergeObject( userConfig , standardFrontendConfig );
      //fs.write();
    } else {
      let standardServerConfig = getStandardServerConfig( file );
      let userConfig = require( file );
      mergeObject( userConfig , standardServerConfig );
    }
    fs.writeFile()
  }
}
