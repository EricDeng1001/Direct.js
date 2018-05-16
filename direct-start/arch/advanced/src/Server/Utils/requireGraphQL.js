const fs = require("fs");
const path = require("path");

module.exports = name =>
  fs.readFileSync( path.resolve( ".", name ) ).toString();
