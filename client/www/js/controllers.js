angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('aptCtrl', function($scope) {
//  $scope.info = {
////    property: {},
////    aptNum: {type: String, required: true},
////    rent: {type: Number, required: true},
////    rentDue: Date,
////    sqrfoot: Number,
////    isAvailable: Boolean,
////    tenants: []
//  }
})

.controller('loginCtrl', function ($scope, userService) {
  $scope.newOne = "false";
  $scope.data = {};
  
  $scope.newAccount = function () {
    $scope.newOne = true;
    $scope.buttonText = "Create Account";
    $scope.data = {};
  }
  
  $scope.login = function() {
    userService.login($scope.data)
    .success(function(data, status){
      console.log(data);
    })
    .error(function(err){
      console.error(err);
    }) 
  }

  $scope.createAccount = function () {}
  $scope.checkInput = function () {
    if ($scope.data === undefined) {
      console.log("data is undefined")
      return false;  
    }
    if ($scope.data.username === undefined) {
      return false;
    }
    if ($scope.data.password === undefined) {
      return false;
    }
    if ($scope.data.confirmPassword === undefined) {
      return false;
    }
    if ($scope.data.password !== $scope.data.confirmPassword) {
      return false;
    }
    console.log("true");
    return true;
  }
})
