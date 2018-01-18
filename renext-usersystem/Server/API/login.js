const { Schema , model } = require("mongoose");
const UserAuth = model("UserAuth");
const UserLog = model("UserLog");
const crypto = require("crypto");

function randFromTo( min , max ){
    var base = Math.random().toFixed( 0 + Math.random() * 10 );
    var result = min;
    var diff = max - min;
    result += diff * base;
    return result;
}

module.exports = ({ res , req }) => {
  const { cert , password } = req.body;
  if( !useridRegExp.test( cert ) || password.length !== 64 ){
    return res.status( 403 ).end();
  }
  UserAuth.findOne( { cert: cert } , ( err , result ) => {
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
      const sess = req.session;
      const token = Number( randFromTo( -5261039 , 6329839 ).toFixed( Math.round( randFromTo( 0 , 11 ) ) ) ).toString( randFromTo( 2 , 36 ) );
      sess[token] = userid;
      sess.token = token;
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
