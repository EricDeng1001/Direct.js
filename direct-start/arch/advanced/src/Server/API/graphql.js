const fs = require("fs");
const path = require("path");

const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const importGraphQL = require("../Utils/requireGraphQL");

const schemaDirPath = path.resolve( __dirname, "../Schema" );

const schemas = fs.readdirSync( schemaDirPath );

var graphqlSchemas = "";

for( let schema of schemas ){
  let ext = schema.slice( schema.indexOf(".") + 1, schema.length );
  if( ext === "graphql" ){
    graphqlSchemas += importGraphQL(`${schemaDirPath}/${schema}`);
  }
}

const schema = buildSchema( graphqlSchemas );

var rootValue = {};

for( let schema of schemas ){
  let ext = schema.slice( schema.indexOf(".") + 1, schema.length );
  if( ext === "js" ){
    rootValue = {
      ...rootValue,
      ...require(`../Schema/${schema}`)
    };
  }
}


module.exports = ( req, res ) => {
  return graphqlHTTP({
    schema,
    rootValue,
    formatError( err ){
      return {
        message: err.message
      };
    },
    context: { req, res }
  })( req, res );
};
