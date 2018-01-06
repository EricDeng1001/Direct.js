const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userid: String,
  message: String,
  createTime: Date
});

mongoose.model( 'Message' , MessageSchema );
