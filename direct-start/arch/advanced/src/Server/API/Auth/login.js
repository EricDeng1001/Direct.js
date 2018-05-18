const mongoose = require("mongoose");

const hmac = require("../../../Algorithm/hmac");
const hash = require("../../../Algorithm/hash");

const ExpireBST = require("../../../DataStructure/ExpireBST");

const {
  __userNotExist__,
  __passwordWrong__,
  __authorizeThrottling__
} = require("../../../Constant/SystemCode");

const {
  __passwordRegex__,
  __certificationRegex__
} = require("../../../Constant/Regex");

const certificationThrottler = new ExpireBST(
  ( newCert, storedCert ) => {
    return ( "0x" + hash( newCert ) ) - ( "0x" + hash( storedCert ) );
  }
);

const Auth = mongoose.model("Auth");

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
      if( auth.length === 0 ){
        res.send({
          status:__userNotExist__
        });
      } else {
        if( certificationThrottler.touch( certification, 10000 ) > 3 ){
          return res.send({
            status: __authorizeThrottling__
          });
        }

        auth = auth[0];
        let encryptedPassword = hmac( password, auth.salt );
        if( encryptedPassword !== auth.password ){
          return res.send({
            status: __passwordWrong__
          });
        }

        req.session.authenticated = certification;
        req.session.permission = auth.permission;

        res.send({
          status: 200,
          permission: auth.permission
        });
      }
    })
    .catch( err => next( err ) )
  ;
}
