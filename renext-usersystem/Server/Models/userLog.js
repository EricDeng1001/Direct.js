var mongoose = require( 'mongoose' );
var UserLogSchema = new mongoose.Schema({
  userid: String,
  action: Number, // 0 login , 1 signup , 2 logout , 3 update .....
  detail: String,
  time: Date
});

mongoose.model( 'UserLog' , UserLogSchema );
