app.controller('addTrainerController', function ($scope, $http, $state) {
  $scope.message = 'New Trainer Form';

  $scope.add = function(trainer) {
    console.log(trainer);
    $http.post('http://localhost:3000/trainers', trainer);
    $state.go($state.current, {}, {reload: true});
  };
});
