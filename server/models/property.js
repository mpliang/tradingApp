var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  manager: User,
  apartment: [{object apartments}],
  name: String,
  address: String
});

var Property = mongoose.model("Property", propertySchema);

module.exports = Property;
