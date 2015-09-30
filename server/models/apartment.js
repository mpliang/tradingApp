var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  property: Property,
  aptNum: {type: String, required: true},
  rent: {type: Number, required: true},
  rentDue: Date,
  sqrfoot: Number,
  isAvailable: Boolean,
  tenants: []
});

var Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
