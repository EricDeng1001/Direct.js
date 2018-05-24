const {
  __permissionDenied__
} = require("../../Constant/SystemCode");

const {
  __root__
} = require("../../Constant/Roles");

const permissons = require("../../Constant/PermissionBackend");

module.exports = ( req, res, next ) => {
  var authorized = false;
  const session = req.session;

  if( session.authenticated ){
    let roles = session.roles;

    if( roles[0] === __root__ ){
      authorized = true;
    } else {
      for( let role of roles ){
        if( permissons[role].indexOf( req.path ) != -1 ){
          authorized = true;
        }
      }
    }
  }

  if( authorized ){
    next();
  } else {
    res.send({
      status: __permissionDenied__
    });
  }
};
