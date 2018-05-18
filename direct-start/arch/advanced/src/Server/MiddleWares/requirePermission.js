const {
  __permissionDenied__
} = require("../../Constant/SystemCode");

const {
  __root__,
  __logined__,
  __admin__
} = require("../../Constant/RolesBackend");

module.exports = ( req, res, next ) => {
  var authorized = false;

  if( req.session.authenticated === req.get("certification") ){
    if( req.session.permission.allowed[0] === __root__ ){
      authorized = true;
      console.log("root comes!!!");
    } else if( req.path in req.session.permission.allowed ){
      authorized = true;
      console.log("authorized");
    }

    if( req.session.permission.banned[0] === __root__ ){
      authorized = false;
      console.log("banned all!!!");
    } else if( req.path in req.session.permission.banned ){
      authorized = false;
      console.log("not allowed");
    }
  }

  if( authorized ){
    res.end();
  } else {
    res.send({
      status: __permissionDenied__
    });
  }
};
