var passport = require('passport');
var Apartment = require('../models/apartment');

module.exports = function (app) {
  app.post('/', function(req, res){
    var apartment = new Apartment(req.body);
    apartment.save();
  });

  app.get('/', function(req, res){

  });

};
