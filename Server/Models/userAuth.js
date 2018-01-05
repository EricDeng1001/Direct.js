const mongoose = require('mongoose');

const UserAuthSchema = new mongoose.Schema({
  userid: String,
  password: String,
  createTime: Date,
  updateTime: Date,
  userRole: String // admin , user
});

mongoose.model( 'UserAuth' , UserAuthSchema );
