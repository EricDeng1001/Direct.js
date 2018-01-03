const mongoose = require('mongoose');
const validApiKeys = require('../inMemory/validKeys');
const UserLog = mongoose.model('UserLog');
module.exports = ({ apiKey }) => {
  validApiKeys.remove( apiKey );
};
