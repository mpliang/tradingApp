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
  $scope.info = {
    num: "1A",
    bedrooms: 3,
    rent: 1500.00,
    bathrooms: 1.5,
    sqrtft: 2000,
    isAvailable: true,
    tenants: ["Joe", "Darien"]
  }
})

.controller('loginCtrl', function ($scope) {
  $scope.newOne = "false";
  $scope.data = {};
  
  $scope.newAccount = function () {
    $scope.newOne = true;
    $scope.buttonText = "Create Account"
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
