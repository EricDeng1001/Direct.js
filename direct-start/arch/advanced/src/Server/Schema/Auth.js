const mongoose = require("mongoose");

mongoose.model( "Auth", mongoose.Schema({
  certification: String,
  password: String,
  salt: String,
  permission: {
    allowed: [String],
    banned: [String],
  },
  id: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
}));
