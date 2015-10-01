var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var propertySchema = new Schema({
  manager: {type: Mongoose.Schema.ObjectId , ref: 'User'},
  apartments: [],
  name: String,
  address: String
});

var Property = mongoose.model("Property", propertySchema);

module.exports = Property;
