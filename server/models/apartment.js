var Mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('./property');

var apartmentSchema = new Schema({
  property: {type: Mongoose.Schema.ObjectId , ref: 'Property'},
  aptNum: {type: String, required: true},
  rent: {type: Number, required: true},
  rentDue: Date,
  sqrfoot: Number,
  isAvailable: Boolean,
  tenants: [],
  applicants: []
});

var Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
