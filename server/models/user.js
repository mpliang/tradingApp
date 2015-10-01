var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Apartment = require('./apartment');

var userSchema = new Schema({
  username: {type: String, required: true},
  isManager: {type: Boolean,  default: false},
  isAdmin: {type: Boolean,  default: false},
  apartmentNum: {type: Mongoose.Schema.ObjectId , ref: 'Apartment'}
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
