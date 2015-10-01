angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope, userService, aptService) {
  $scope.data = {};
  $scope.user = userService.user;
    $scope.addApartment= function(){
    aptService.add($scope.data);
    console.log("scopedata", $scope.data);
  } 
})

.controller('aptCtrl', function ($scope, aptService, userService, $state) {

  
  aptService.get()
    .success(function (data, status) {
      aptService.apartments = data;
      $scope.apartments = data;
      console.log(data);
      console.log(status);
    })
  $scope.click = function (aptID) {
    $state.go('tab.aptDetail');
    aptService.current = aptID;
  }
})

.controller('aptDetailCtrl', function ($scope, aptService, userService) {

  if (aptService.apartments.length > 0) {
    findApt(aptService.current)
    console.log("current", aptService.current);
  } else {
    aptService.get()
    .success(function (data, status) {
      aptService.apartments = data;
      console.log(data);
      findApt(userService.user.apartmentNum);
    })
  };
  
  function findApt(id)  {
    aptService.apartments.forEach(function(apt) {
      console.log(apt._id, id);
      if(apt._id === id) {
        $scope.info = apt;
      }
    })
  }
})

.controller('loginCtrl', function ($scope, userService, $state, aptService) {
  $scope.newOne = "false";
  $scope.data = {};

  $scope.newAccount = function () {
    $scope.newOne = true;
    $scope.buttonText = "Create Account";
    $scope.data = {};
  }

  $scope.login = function () {
    userService.login($scope.data)
      .success(function (data, status) {
        //      console.log(data);
        //      console.log("success");
        //      console.log(data);
        userService.user = data;
        if (data.isManager) {
          $state.go('tab.manager');
        } else {
          $state.go('tab.aptDetail');
        }

      })
      .error(function (err) {
        if (err !== undefined) {
          console.error(err);
        }
      })
  }

  $scope.createAccount = function () {
    userService.register($scope.data)
      .success(function (data, status) {
        console.log(data);
        $scope.login();
      })
      .error(function (err) {
        if (err !== undefined) {
          console.error(err);
        }
      })
  }

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