const fs = require("fs");
const mergeObject = require("./mergeObject");

const getStandardFrontendConfig = file => require(`./Resources/app/src/Frontend/Config/${file}`);
const getStandardServerConfig = file => require(`./Resources/app/src/Server/Config/${file}`);

module.exports = function( path , isF ){
  const files = fs.readdirSync( path );
  for( let file of files ){
    if( isF ){
      let standardFrontendConfig = getStandardFrontendConfig( file );
      let userConfig = require( file );
      mergeObject( userConfig , standardFrontendConfig );
    } else {
      let standardServerConfig = getStandardServerConfig( file );
      let userConfig = require( file );
      mergeObject( userConfig , standardServerConfig );
    }
  }
}
