var passport = require('passport');
var Account = require('../models/user');
var Apartment = require('../models/apartment');

module.exports = function (app) {

  /*login register routes*/

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
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      console.log(req.body);
      Account.findOne({username: req.body.username}, function(err, account){
        res.send(account);
        console.log(account);
      });
      // res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

  /*user routes*/

  app.get('/tenantLookup', function(req, res){

  });

/*admin add properties
admin remove properties

admin add managers
admin remove managers

managers add and remove apartments from and to their properties*/

  /*Manager routes*/

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
  })

  app.post('/addTenant', function(req, res){
    Account.findById(req.body.uid, function(err, user){
      Apartment.findById(req.body.aid, function(err, apartment){
        console.log(apartment);
        apartment.tenants.push(user);
        apartment.save();
        res.send("ok");
      });
    });
  });

  app.delete('/deleteTenant', function(req, res){
    Apartment.findById(req.body.aid, function(err, apartment){
      Account.findById(req.body.uid, function(err, user){
        if(user){
          console.log(apartment.tenants);
          apartment.tenants.forEach(function(tenant, idx){
            if(tenant._id.toString() === user._id.toString() || tenant._id.toString() === undefined){
              apartment.tenants.splice(idx, 1);
            }
          });
          apartment.save();
        }
      });
    });
  });

  /*admin routes*/

  app.post('/addManager', function(req, res){
   Account.findById(req.body.uid, function(err, user){
     Property.findById(req.body.pid, function(err, property){
       property.manager = user;
       apartment.save();
       res.send("ok");
     });
   });
 });

 // app.delete('/deleteManager', function(req, res){
 //   Account.findById(req.body.uid)
 // });

};
