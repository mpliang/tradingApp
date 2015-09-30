var passport = require('passport');
var Account = require('../models/user');

module.exports = function (app) {

  app.get('/', function (req, res) {
    Account.find({}, function(err, users){
      res.send(users);
    });
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username , isManager: req.body.isManager, isAdmin: req.body.isAdmin, rentDue: req.body.rentDue}), req.body.password, function(err, account) {
        if (err) {
          console.log(err);
            // return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.send(200);
        });
    });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
      res.send(200);
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      console.log("success", res);
      res.send(200);
      // res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

};
