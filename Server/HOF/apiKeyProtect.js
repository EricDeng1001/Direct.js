const apiKeys = require('../inMemory/validKeys');

module.exports = func => ( req , res , next ) => {
  var key = req.get( 'apiKey' );
  if( !apiKeys.has( key ) ){
    res.status( 403 ).end();
  }
  func( req , res , next );
};
