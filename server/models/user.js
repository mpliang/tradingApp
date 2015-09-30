var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  username: {type: String, required: true},
  isManager: {type: Boolean,  default: false},
  isAdmin: {type: Boolean,  default: false}
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

module.exports = User;
