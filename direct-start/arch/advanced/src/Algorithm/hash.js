const crypto = require("crypto");

module.exports = function( text ){
  return crypto
           .createHash("sha256")
           .update( text )
           .digest("hex");
};
