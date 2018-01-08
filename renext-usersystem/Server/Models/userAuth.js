const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
  userid: String,
  password: String,
  createTime: Date,
  updateTime: Date,
  userRole: String // admin , user
});

mongoose.model( 'UserAuth' , UserAuthSchema );

const TrieSearchTree = require('../DataStructure/TrieSearchTree');
const validKeys = {};
const expireTimeout = {};

Object.defineProperty( global , 'validKeys' , {
  value: validKeys,
  writable: false
});

Object.defineProperty( global , 'expireTimeout' , {
  value: expireTimeout,
  writable: false
});

Object.defineProperty( global , 'regExps' , {
  value: {
    useridRegExp: /^\w*$/,
    passwordRegExp: /^[\w!@*]*([!@*]|[A-Z])+[\w!@*]*([!@*]|[A-Z])+[\w!@*]*$/
  },
  writable: false
});
