var mongoose = require('mongoose');
var db = mongoose.connect( 'mongodb://localhost/mongo' );
require( '../models/user' );

module.exports = db;
