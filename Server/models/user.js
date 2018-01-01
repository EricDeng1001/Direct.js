var mongoose = require( 'mongoose' );
var UserSchema = new mongoose.Schema({
  uid: Number,
  nickname: String,
  password: String,
  createTime: Date,
  lastLogin: Date
});

mongoose.model( 'User' , UserSchema );
