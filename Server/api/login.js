const mongoose = require('mongoose');
const User = mongoose.model('User');
const apiKeys = require('../constants/apiKeys');
const validApiKeys = require('../inMemory/validKeys');

module.exports = ({ uid , password , onSuccess , onError }) => {
  User.find( { uid: uid } , ( err , result ) => {
    if( !result.length ){
      return onError( new Error("uid") );
    }
    result = result[0];
    if( result.password === password ){
      const key = apiKeys[ Math.floor( Math.random() * 1000000 ) % apiKeys.length ];
      validApiKeys.insert( key );
      return onSuccess( key );
    }
    return onError( new Error("password") );
  });
};
