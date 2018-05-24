const mongoose = require("mongoose");

const Auth = mongoose.model("Auth");

const hmac = require("../Algorithm/hmac");
const getRandomString = require("../Algorithm/getRandomString");

const {
  __userExist__
} = require("../Constant/SystemCode");

const {
  __logined__
} = require("../Constant/Roles");

const {
  __passwordRegex__,
  __certificationRegex__
} = require("../Constant/Regex");


module.exports = ( req, res, next ) => {
  req.session.authenticated = "";

  const {
    certification,
    password
  } = req.body;

  if( !__certificationRegex__.test( certification ) ){
    return res.status( 403 ).end();
  }
  if( !__passwordRegex__.test( password ) ){
    return res.status( 403 ).end();
  }

  Auth.find({ certification })
    .then( auth => {
      if( auth.length ){
        res.send({
          status: __userExist__
        });
      } else {
        let salt = getRandomString( 16 );
        let encryptedPassword = hmac( password, salt );
        let creation = new Auth({
          certification,
          password: encryptedPassword,
          salt,
          roles: [__logined__],
          id: new mongoose.Types.ObjectId()
        });

        creation.save()
          .then( auth => {
            res.send({
              status: 200,
              roles: auth.roles
            });
            req.session.authenticated = certification;
            req.session.roles = auth.roles;
          })
          .catch( e => next( e ) )
        ;
      }
    })
    .catch( e => next( e ) )
  ;
};
