var mongoose = require( 'mongoose' );
var KnowledgeSchema = new mongoose.Schema({
  kid: Number,
  name: String,
  content: String,
  createTime: Date,
  lastModified: Date
});

mongoose.model( 'Knowledge' , KnowledgeSchema );
