const mongoose = require('mongoose');
const UserAuth = mongoose.model('UserAuth');
const UserLog = mongoose.model('UserLog');

const validKeys = global.validKeys;
const { useridRegExp , passwordRegExp } = global.regExps;

const expireTime = 1000 * 60 * 60 * 24 * 15;//15days

module.exports = ({ res , req }) => {
  const { userid , password } = req.body;
  if( !useridRegExp.test( userid ) || !passwordRegExp.test( password ) || password.length < 8 ){
    return res.status( 403 ).end();
  }
  UserAuth.findOne( { userid: userid } , ( err , result ) => {
    if( err ){
      return res.status( 500 ).end();
    }
    if( !result ){
      return res.send({
        status: 1
      });
    }
    if( result.password === password ){
      if( validKeys[userid] ){
        let log = new UserLog({
          userid,
          action: 0,
          detail: 'hot login',
          time: new Date()
        });
        log.save();
        return res.send({
          status: 0,
          apiKey: validKeys[userid]
        });
      }
      const key = ( new Buffer( userid + Date.now() ) ).toString('base64');
      validKeys[userid] = key;
      expireTimeout[userid] = setTimeout(
        () => {
          validKeys.remove( userid + 'secertKey' + key );
          loginedUsers.remove( userid );
          delete expireTimeout[userid];
        },
        expireTime
      );

      let log = new UserLog({
        userid,
        action: 0,
        detail: 'cold login',
        time: new Date()
      });
      log.save();

      return res.send({
        status: 0,
        apiKey: key
      });
    }
    return res.send({
      status: 2
    });
  });
};
