const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = ({ uid , nickname , password , onSuccess , onError }) => {
  User.find({ uid: uid } , ( err , result ) => {
    if( result.length ){
      onError( new Error("uid") );
      return;
    }
    const date = new Date();
    const user = new User({
      uid,
      nickname,
      password,
      createTime: date,
      lastLogin: date
    });
    user.save( err => {
      if( err ){
        onError( err );
      }
      onSuccess();
    });
  });
};
