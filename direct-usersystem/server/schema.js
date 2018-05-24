const mongoose = require("mongoose");

mongoose.model( "Auth", mongoose.Schema({
  certification: String,
  password: String,
  salt: String,
  roles: [String]
}, {
  timestamps: true
}));
