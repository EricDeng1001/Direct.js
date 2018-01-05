const mongoose = require('mongoose');
const validKeys = global.validKeys;
const expireTimeout = global.expireTimeout;

const UserLog = mongoose.model('UserLog');

module.exports = ({ res , apiKey , userid }) => {
    delete validKeys[userid];
    clearTimeout( expireTimeout[userid] );
    delete expireTimeout[userid];
    (new UserLog({
      userid,
      action: 2,
      detail: "user logout",
      time: new Date()
    })).save();
    res.send({
      status: 0
    });
};
