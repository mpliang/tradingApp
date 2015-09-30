'use strict';

var passport = require('passport');
var Apartment = require('../models/apartment');
var Mongoose = require('mongoose');

module.exports = function (app) {
  app.post('/', function(req, res){
    var apartment = new Apartment(req.body);
    apartment.save(function(err, savedApartment){
      res.send();
    });
  });

  app.get('/', function(req, res){
    Apartment.find({}, function(err, apartments){
      res.send(apartments);
    })
  });

};
