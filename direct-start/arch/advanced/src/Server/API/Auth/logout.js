module.exports = ( req, res ) => {
  delete req.session.authenticated;
  delete req.session.permission;
  res.status( 200 ).end();
}
