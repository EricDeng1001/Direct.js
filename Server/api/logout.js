const mongoose = require('mongoose');
const validApiKeys = require('../inMemory/validKeys');

module.exports = ({ key , onSuccess , onError }) => {
  validApiKeys.remove( key );
};
