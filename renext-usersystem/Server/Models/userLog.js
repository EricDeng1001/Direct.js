const mongoose = require("mongoose");

var UserLogSchema = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  action: String,
  detail: String,
  time: {
    type: Date,
    default: Date.now
  }
});

mongoose.model( 'UserLog' , UserLogSchema );
