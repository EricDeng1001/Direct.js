const mongoose = require("mongoose");

const hmac = require("../../Algorithm/hmac");
const hash = require("../../Algorithm/hash");
const getRandomString = require("../../Algorithm/getRandomString");

const ExpireBST = require("../../DataStructure/ExpireBST");

const {
  __userExist__,
  __userNotExist__,
  __passwordWrong__,
  __authorizeThrottling__,
  __graphqlServiceDenied__
} = require("../../Constant/SystemCode");

const {
  __passwordRegex__,
  __certificationRegex__
} = require("../../Constant/Regex");

const certificationThrottler = new ExpireBST(
  ( newCert, storedCert ) =>
    ( "0x" + hash( newCert ) ) - ( "0x" + hash( storedCert ) )
);

const Auth = mongoose.model( "Auth", mongoose.Schema({
  certification: String,
  password: String,
  salt: String,
  permission: {
    type: {
      allowed: [String],
      banned: [String],
    },
    default: {
      allowed: ["readMore"],
      banned: [""]
    }
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  }
}, {
  timestamps: true
}));

module.exports = {
  createAuth({ certification, password }, { req, res } ){
    req.session.authorized = "";
    if(
      !__certificationRegex__.test( certification )
      || !__passwordRegex__.test( password )
    ){
      return res.status( 403 ).send({
        reason: __graphqlServiceDenied__
      });
    }
    return new Promise( ( resolve, reject ) => {
      Auth
      .find({ certification })
      .then( auth => {
        if( auth.length ){
          reject( __userExist__ );
        } else {
          let salt = getRandomString( 16 );
          password = hmac( password, salt );
          let creation = new Auth({
            certification,
            password,
            salt
          });
          creation
          .save()
          .then( auth => {
            const token = getRandomString( 256 );
            resolve({
              permission: auth.permission,
              token
            });
            req.session.authorized = token;
            req.session.permission = auth.permission;
            req.session.certification = certification;
          })
          .catch( e => { throw e } );
        }
      })
      .catch( e => {
        res.status( 500 ).end();
        reject( e );
      });
    });
  },

  authorize({ certification, password }, { req, res } ){
    req.session.authorized = "";
    if(
      !__certificationRegex__.test( certification )
      || !__passwordRegex__.test( password )
    ){
      return res.status( 403 ).send({
        reason: __graphqlServiceDenied__
      });
    }
    return new Promise( ( resolve, reject ) => {
      Auth
      .find({ certification })
      .then( auth => {
        if( auth.length === 0 ){
          reject( __userNotExist__ );
        } else {
          if( certificationThrottler.touch( certification, 10 * 1000 ) > 3 ){
            return reject( __authorizeThrottling__ );
          }
          auth = auth[0];
          password = hmac( password, auth.salt );
          if( password === auth.password ){
            const token = getRandomString( 256 );
            resolve({
              permission: auth.permission,
              token
            });
            req.session.authorized = token;
            req.session.permission = auth.permission;
            req.session.certification = certification;
          } else {
            reject( __passwordWrong__ );
          }
        }
      })
      .catch( err => {
        res.status( 500 ).end();
        reject( err );
      });
    });
  },

  updateAuth({ certification, originPassword, changeTo }, { req, res } ){
    if(
      !__certificationRegex__.test( certification )
      || !__passwordRegex__.test( password )
      || !__passwordRegex__.test( changeTo )
    ){
      return res.status( 403 ).send({
        reason: __graphqlServiceDenied__
      });
    }
    return new Promise( ( reslove, reject ) => {
      Auth.
      find({ certification })
      .then( auth => {
        if( auth.length === 0 ){
          reject( __userNotExist__ ); // or maybe we should reject a safety-warning
        } else {
          auth = auth[0];
          originPassword = hmac( originPassword, auth.salt );
          if( auth.password === originPassword ){
            changeTo = hmac( changeTo, auth.salt );
            auth
            .updateOne( { certification }, { password: changeTo } )
            .then( auth => {
              resolve();
            })
            .catch( err => { throw err } );
          }
        }
      })
      .catch( err => {
        res.status( 500 ).end();
        reject( err );
      });
    })
  }
}
