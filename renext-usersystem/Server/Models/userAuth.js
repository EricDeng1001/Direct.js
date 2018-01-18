const { Schema , model } = require("mongoose");

var UserAuth = new Schema({
  userid: Schema.Types.ObjectId,
  cert: String,
  password: String,
  createTime: {
    type: Date,
    default: Date.now
  }
});

model( "UserAuth" , UserAuth );
