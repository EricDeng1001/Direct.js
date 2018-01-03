var mongoose = require( 'mongoose' );
var UserInfoSchema = new mongoose.Schema({
  identifier: Number,
  userRole: Number,
  gender: Boolean,
  nickname: String
});

mongoose.model( 'UserInfo' , UserInfoSchema );
