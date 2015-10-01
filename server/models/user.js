var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Apartment = require('./apartment');

var userSchema = new Schema({
  username: {type: String, required: true},
  isManager: {type: Boolean,  default: false},
  isAdmin: {type: Boolean,  default: false},
  apartmentNum: {type: Mongoose.Schema.ObjectId , ref: 'Apartment'},
  isTenant: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

var User = Mongoose.model("User", userSchema);

module.exports = User;
