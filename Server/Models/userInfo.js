var mongoose = require( 'mongoose' );
var UserInfoSchema = new mongoose.Schema({
  userid: String,
  friend: {
    type: [String],
    default: ["gender","followings"]
  },
  follower: [String],
  following: [String],
  public: {
    type: [String],
    default: ["followers","nickname","motto","userRole"]
  },
  rules: [{
    keys: [String],
    authorized: [String]
  }],
  userRole: Number,
  gender: Boolean,
  nickname: String,
  motto: String,
  friends: [String],
  followers: [String],
  followings: [String],
  blockList: [String]
});

mongoose.model( 'UserInfo' , UserInfoSchema );
