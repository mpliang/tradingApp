var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var User = require('./user');

var propertySchema = new Schema({
  manager: {type: Mongoose.Schema.ObjectId , ref: 'User'},
  apartments: [],
  name: String,
  address: String
});

var Property = Mongoose.model("Property", propertySchema);

module.exports = Property;
