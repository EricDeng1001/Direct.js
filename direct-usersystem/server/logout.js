module.exports = ( req, res ) => {
  delete req.session.authenticated;
  delete req.session.roles;
  res.status( 200 ).end();
}
