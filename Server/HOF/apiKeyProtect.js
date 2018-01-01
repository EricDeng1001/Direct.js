const apiKeys = require('../inMemory/validKeys');

module.exports = func => ( req , res , next ) => {
  var key = req.get( 'apiKey' );
  if( !apiKeys.has( key ) ){
    res.send({
      error: "Permission denied"
    });
    return;
  }
  func( req , res , next );
};
