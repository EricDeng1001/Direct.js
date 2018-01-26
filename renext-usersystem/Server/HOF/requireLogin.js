module.exports = api => ({ req , res , next }) => {
  const { userid , token } = req.body;
  if( !userid || !token ){
    return res.status( 403 ).end();
  }
  if( req.session[token] !== userid ){
    res.status( 403 ).end();
  }
  else {
    api({ req , res , next });
  }
};
