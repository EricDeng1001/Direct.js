const mongoose = require("mongoose");

var UserAuth = new mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  cert: String,
  password: String,
  createTime: {
    type: Date,
    default: Date.now
  }
});

mongoose.model( "UserAuth" , UserAuth );
