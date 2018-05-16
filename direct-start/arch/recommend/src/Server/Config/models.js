const fs = require("fs");
const path = require("path");

const schemaDirPath = path.resolve( __dirname, "../Schema" );

const models = fs.readdirSync( schemaDirPath );

for( let model of models ){
  let ext = model.slice( model.indexOf(".") + 1, model.length );
  if( ext === "js" ){
    require(`${schemaDirPath}/${model}`);
  }
}
