const mongoose = require('mongoose');
const UserInfo = mongoose.model('UserInfo');

module.exports = ({ req , res , apiKey , userid }) => {
  const { targetUserid , ...info } = req.body;
  if( !targetUserid || !info ){
    return res.status( 403 ).end();
  }
  if( userid !== targetUserid ){
    return res.status( 403 ).end();
  }
  let status;
  UserInfo.findOne( { userid: userid } , ( err , result ) => {
    if( err ){
      return res.status( 500 ).end();
    }
    if( result ){
      status = 1;
      let keys = Object.keys( info );
      for( let i = 0 ; i < keys.length ; i++ ){
        result[keys[i]] = info[keys[i]];
      }
    }
    else {
      status = 0;
      result = new UserInfo({
        userid,
        ...info
      });
    }
    result.save( err => {
      if( err ){
        return res.status( 500 ).end();
      }
      return res.send({
        status,
      });
    })
  })
}
