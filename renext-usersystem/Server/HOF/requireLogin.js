module.exports = api => ({ req , res , next }) => {
  if( !req.session.logined ){
    res.status( 403 ).end();
  } else {
    api({ req , res , next });
  }
};
