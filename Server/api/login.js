const mongoose = require('mongoose');
const User = mongoose.model('User');
const validApiKeys = require('../inMemory/validKeys');

const expireTime = 1000 * 60 * 60 * 24 * 15;//15days

module.exports = ({ userid , password , onSuccess , onError }) => {
  if( !userid || !password ){
    return onError( new Error("attack") );
  }
  User.findOne( { userid: userid } , ( err , result ) => {
    if( err ){
      return onError( err );
    }
    if( !result ){
      return onError( new Error("userid") );
    }
    const { nickname } = result;
    if( result.password === password ){
      const key = ( new Buffer( userid + nickname + ( new Date() ) ) ).toString('base64');
      validApiKeys.insert( key );
      setTimeout(
        () => validApiKeys.remove( key ),
        expireTime
      );
      return onSuccess( key , nickname );
    }
    return onError( new Error("password") );
  });
};
