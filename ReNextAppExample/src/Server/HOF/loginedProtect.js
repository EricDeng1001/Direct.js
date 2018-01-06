const validKeys = global.validKeys;

module.exports = func => ({ req , res , next }) => {
  var apiKey = req.get('apiKey');
  var userid = req.get('userid');
  if( !apiKey || !userid ){
    return res.status( 403 ).end();
  }
  if( validKeys[userid] !== apiKey ){
    res.status( 403 ).end();
  }
  else {
    func({ req , res , userid , apiKey , next });
  }
};
