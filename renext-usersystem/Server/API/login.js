const mongoose = require("mongoose");
const UserAuth = mongoose.model("UserAuth");
const UserLog = mongoose.model("UserLog");
const crypto = require("crypto");
const { certRegExp , passwordRegExp } = require("../../Constant/regExp");
function randFromTo( min , max ){
    var base = Math.random();
    var result = min;
    var diff = max - min;
    result += diff * base;
    return result;
}

module.exports = ({ res , req }) => {
  const { cert , password } = req.body;
  if( !certRegExp.test( cert ) || !passwordRegExp.test( password ) ){
    return res.status( 403 ).end();
  }
  UserAuth.findOne( { cert } , ( err , result ) => {
    if( err ){
      return res.status( 500 ).end();
    }
    if( !result ){
      return res.send({
        status: 1
      });
    }
    let hash = crypto.createHash("sha256");
    hash.write( password );
    if( result.password === hash.digest("hex") ){
      const { userid } = result;
      const token = String(Number( randFromTo( Number.SAFE_MIN_INTEGER , Number.SAFE_MAX_INTEGER ).toFixed( Math.round( randFromTo( 0 , 11 ) ) ) ).toString( randFromTo( 2 , 36 ) ));
      req.session[token] = userid;
      req.session.token = token;
      res.send({
        token,
        userid,
        status: 0
      });
      let log = new UserLog({
        userid,
        action: "login",
        detail: "ip" + req.ip
      });
      return log.save();
    }
    return res.send({
      status: 2
    });
  });
};
