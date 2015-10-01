angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, userService, aptService, propertyService) {
    $scope.data = {};
    $scope.managers = [];
    $scope.user = userService.user;
    $scope.property = {};

    $scope.addApartment = function() {
      $scope.properties.forEach(function(property) {
        console.log(property.name, $scope.data.property);
        if(property.name === $scope.data.property) {
          $scope.data.property = property._id;
        }
      })
        aptService.add($scope.data);
        console.log("scopedata", $scope.data);
    }
    userService.get()
        .success(function(data, status) {
            $scope.users = data;
            data.forEach(function(user) {
                if (user.isManager) {
                    $scope.managers.push(user);
                }
            })
        })
    $scope.addProperty = function() {
      console.log($scope.property);
      $scope.managers.forEach(function(mgr) {
        if(mgr.username === $scope.property.managerName) {
          $scope.property._id = mgr._id;
        }
      })
         
        propertyService.add($scope.property)
            .success(function(data, status) {
                console.log(data);
                $state.go('tab.properties');
            })
    }
         propertyService.get()
        .success(function(data, status) {
            $scope.properties = data;
            console.log(data);
        })
})

.controller('propCtrl', function($scope, userService, propertyService, $state) {
        propertyService.get()
            .success(function(data, status) {
          
                propertyService.properties = data;
                $scope.properties = data;
                console.log(data);
                console.log(status);
            })
        $scope.click = function(propID) {
            $state.go('tab.manager');
            propertyService.current = propID;
        }
    })


    .controller('aptCtrl', function($scope, aptService, userService, $state) {


        aptService.get()
            .success(function(data, status) {
                aptService.apartments = data;
                $scope.apartments = data;
                console.log(data);
                console.log(status);
            })
        $scope.click = function(aptID) {
            $state.go('tab.aptDetail');
            aptService.current = aptID;
          } 
  
    })
//!user.isTenant && !applied || (!user.isAdmin || !user.isManager)
    .controller('aptDetailCtrl', function($scope, aptService, userService) {
        $scope.applied = false;
        $scope.apply = function (){
          userService.apply({aid: aptService.current, uid: userService.user._id})
          .success(function(data, status){
            $scope.applied = true;
            console.log(data);
          })
        }
        if (aptService.apartments.length > 0) {
            findApt(aptService.current)
            console.log("current", aptService.current);
        } else {
            aptService.get()
                .success(function(data, status) {
                    aptService.apartments = data;
                    console.log(data);
                    findApt(userService.user.apartmentNum);
                })
        };
        $scope.checkButton = function(){
          if (userService.user.isTenant || $scope.applied || userService.user.isManager){
            return false;
          } else {return true}
        }
        userService.getApplicants(aptService.current)
          .success(function(data, status) {
            $scope.applicants = data;
        }

        function findApt(id) {
            aptService.apartments.forEach(function(apt) {
                console.log(apt._id, id);
                if (apt._id === id) {
                    $scope.info = apt;
                }
            })
        }
    })

    .controller('loginCtrl', function($scope, userService, $state, aptService) {
        $scope.newOne = "false";
        $scope.data = {};

        $scope.newAccount = function() {
            $scope.newOne = true;
            $scope.buttonText = "Create Account";
            $scope.data = {};
        }

        $scope.login = function() {
            userService.login($scope.data)
                .success(function(data, status) {
                    //      console.log(data);
                    //      console.log("success");
                    //      console.log(data);
                    userService.user = data;
                    if (data.isManager) {
                        $state.go('tab.manager');
                    } else if (data.isTenent) {
                        $state.go('tab.aptDetail');
                    } else {
                      $state.go('tab.properties');
                    }

                })
                .error(function(err) {
                    if (err !== undefined) {
                        console.error(err);
                    }
                })
        }

        $scope.createAccount = function() {
            userService.register($scope.data)
                .success(function(data, status) {
                    console.log(data);
                    $scope.login();
                })
                .error(function(err) {
                    if (err !== undefined) {
                        console.error(err);
                    }
                })
        }

        $scope.checkInput = function() {
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