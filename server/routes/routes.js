var passport = require('passport');
var Account = require('../models/user');
var Apartment = require('../models/apartment');

module.exports = function (app) {

  /*User routes*/

  app.get('/', function (req, res) {
    Account.find({}, function(err, users){
      console.log(err);
      res.send(users);
      console.log(users);
    });
  });

  app.get('/register', function(req, res) {
      res.render('register', {});
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username , isManager: req.body.isManager, isAdmin: req.body.isAdmin, rentDue: req.body.rentDue}), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
            // return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.send(req.body);
        });
    });
  });

  app.get('/login', function(req, res) {
      // res.render('login', { user : req.user });
      res.send(req.body);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.send(req.body);
      console.log(req.body);
      // res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

  /*Apartment routes*/

  app.post('/apartment', function(req, res){
    var apartment = new Apartment(req.body);
    apartment.save(function(err, savedApartment){
      res.send(savedApartment);
    });
  });

  app.get('/apartment', function(req, res){
    Apartment.find({}, function(err, apartments){
      res.send(apartments);
    })
  });

};
