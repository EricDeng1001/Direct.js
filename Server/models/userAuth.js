var mongoose = require( 'mongoose' );
var UserAuthSchema = new mongoose.Schema({
  userid: String,
  identifier: Number,
  password: String,
  createTime: Date,
  updateTime: Date,
  authorized: Array
});

mongoose.model( 'UserAuth' , UserAuthSchema );
