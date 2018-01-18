var { Schema , model } = require('mongoose');

var UserLogSchema = new Schema({
  userid: Schema.Types.ObjectId,
  action: String
  detail: String,
  time: {
    type: Date,
    default: Date.now
  }
});

model( 'UserLog' , UserLogSchema );
