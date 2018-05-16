const crypto = require("crypto");

module.exports = function( text, salt ){
  return crypto
           .createHmac( "sha256", salt )
           .update( text )
           .digest("hex");
};
