const { __permissionDenied__ } = require("../../Constant/SystemCode");

module.exports = ( req, res, next ) => {
  if( req.session.authorized === req.get("token") ){
    return next();
  }
  res.status( 403 ).send( __permissionDenied__ );
};
