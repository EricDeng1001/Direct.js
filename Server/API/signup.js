const mongoose = require('mongoose');
const UserAuth = mongoose.model('UserAuth');
const UserLog = mongoose.model('UserLog');

module.exports = ({ res , req }) => {
  const { userid , password } = req.body;
  if( !useridRegExp.test( userid ) || !passwordRegExp.test( password ) || password.length < 8 ){
    return res.status( 403 ).end();
  }
  UserAuth.findOne({ userid: userid } , ( err , result ) => {
    if( err ){
      return res.status( 500 ).end();
    }
    if( result ){
      return res.send({
        status: 1
      });
    }
    const date = new Date();
    const user = new UserAuth({
      userid,
      password,
      createTime: date,
      updateTime: date,
      userRole: 1
    });
    user.save( err => {
      if( err ){
        return res.status( 500 ).end();
      }
      res.send({
        status: 0
      });
    });
  });
};
