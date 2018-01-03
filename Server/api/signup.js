const mongoose = require('mongoose');
const UserAuth = mongoose.model('UserAuth');
const UserLog = mongoose.model('UserLog');

module.exports = ({ userid , password , onSuccess , onError }) => {
  User.findOne({ userid: userid } , ( err , result ) => {
    if( err ){
      return onError( err );
    }
    if( !result ){
      return onError( new Error("userid") );
    }
    const date = new Date();
    const user = new UserAuth({
      userid,
      password,
      createTime: date
    });
    user.save( err => {
      if( err ){
        return onError( err );
      }
      onSuccess();
    });
  });
};
