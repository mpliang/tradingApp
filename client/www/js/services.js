angular.module('starter.services', [])

.service('loginService', function ($http) {
  var loggedIn = false;

})

.service('userService', function ($http, $state) {

  this.login = function (data) {
    return $http.post("http://localhost:1337/login", data);

  }
  this.register = function (data) {
    return $http.post("http://localhost:1337/register", data);
  }
})

.service('aptService', function ($http) {
  this.current = "";
  this.get = function (){
     return $http.get("http://localhost:1337/apartment");
  }
  this.add = function (data) {
      return $http.post("http://localhost:1337/apartment", data);
  }
})



