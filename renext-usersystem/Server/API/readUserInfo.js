const mongoose = require('mongoose');
const UserInfo = mongoose.model('UserInfo');

module.exports = ({ req , res , apiKey , userid }) => {
  const { targetUserid } = req.body;
  if( !targetUserid ){
    return res.status( 403 ).end();
  }
  UserInfo.findOne({ userid: targetUserid } , ( err , result ) => {
    if( err ){
      return res.status( 500 ).end();
    }
    if( !result ){
      return res.status( 403 ).end();
    }
    if( targetUserid === userid ){
      let { _id , __v , ...response } = result._doc;
      return res.send({
        ...response
      });
    }
    const {
      public,
      following,
      follower,
      friend,
      rules,
      friends,
      followings,
      followers
    } = result;
    let response = {};
    for( let i = 0 ; i < public.length ; i++ ){
      response[public[i]] = result[public[i]];
    }
    if( friends.find( f => f === targetUserid ) ){
      for( let i = 0 ; i < friend.length ; i++ ){
        response[friend[i]] = result[friend[i]];
      }
    }
    if( followers.find( f => f === targetUserid ) ){
      for( let i = 0 ; i < follower.length ; i++ ){
        response[follower[i]] = result[follower[i]];
      }
    }
    if( followings.find( f => f === targetUserid ) ){
      for( let i = 0 ; i < following.length ; i++ ){
        response[following[i]] = result[following[i]];
      }
    }
    if( rules.authorized.find( a => a === targetUserid ) ){
      for( let i = 0 ; i < rules.keys.length ; i++ ){
        response[rules.keys[i]] = result[rules.keys[i]];
      }
    }
    return res.send({
      ...response
    });
  });
}
