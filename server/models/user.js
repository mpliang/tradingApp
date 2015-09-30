var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username: {type: String, required: true},
  isManager: {type: Boolean, required: true,  default: false},
  isAdmin: {type: Boolean, required: true,  default: false},
  rentDue: Date
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
