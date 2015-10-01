var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Property = require('./property');

var apartmentSchema = new Schema({
  property: {type: Mongoose.Schema.ObjectId , ref: 'Property'},
  aptNum: {type: String, required: true},
  rent: {type: Number, required: true},
  rentDue: Date,
  sqrfoot: Number,
  isAvailable: Boolean,
  picture: String,
  tenants: [],
  applicants: [],
});

var Apartment = Mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
