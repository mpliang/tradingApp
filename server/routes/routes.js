var passport = require('passport');
var Account = require('../models/user');
var Apartment = require('../models/apartment');
var Property = require('../models/property')

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

  // app.get('/tenantLookup', function(req, res){
  //
  // });

/*admin add properties
admin remove properties

admin add managers
admin remove managers

managers add and remove apartments from and to their properties*/

  /*Manager routes*/

  /*add apartment*/
  app.post('/addApartment', function(req, res){
    Property.findById(req.body.property, function(err, property){
      console.log(property);
      var apartment = new Apartment(req.body);
      console.log(apartment);
      property.apartments.push(apartment);
      property.save();
      apartment.save(function(err, savedApartment){
        res.send(savedApartment);
      });
    });
  });

  // /*delete apartment*/
  // // app.delete('/deleteApartment', function(req, res){
  // //   Apartment.findById(req.body._id, function(err, apartment){
  // //     Property.findById(apartment.property, function(err, property){
  // //       property.apartments.forEach(function(apartments, idx){
  // //         if(apartments._id.toString() === property._id.toString()){
  // //           property.apartments.splice(idx, 1);
  // //         }
  // //       });
  // //       property.save();
  // //     });
  // //     Apartment.remove();
  // //   });
  // // });

  /*get all apartment*/
  app.get('/apartment', function(req, res){
    Apartment.find({}, function(err, apartments){
      res.send(apartments);
    })
  })


  /*add a tenant*/
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

  /*delete a tenant*/
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

  /*add a manager*/

  app.post('/addManager', function(req, res){
    Account.findById(req.body.uid, function(err, user){
     Property.findById(req.body.pid, function(err, property){
       property.manager = user;
        res.send("ok");
      });
    });
  });

/*delete a manager*/
 app.delete('/deleteManager', function(req, res){
   Account.findById(req.body.uid, function(err, user){
     Property.findById(req.body.pid, function(err, property){
       if(property.manager.toString() === user._id.toString()){
        property.manager = null;
        apartment.save();
       }
     });
   });
 });

 /*add a property*/

 app.post('/addProperty', function(req, res){
  //  console.log(req.body);
   var property = new Property(req.body);
   console.log(property);
   property.save(function(err, savedProperty){
     console.log(err);
     res.send(savedProperty);
     console.log(savedProperty);
   });
 });

 /*delete a property*/

 app.delete('/deleteProperty', function(req, res){
   Property.findByIdAndRemove(req.body.pid, function(err){
     res.send();
   });
 });


};
