app.controller('addController', function ($scope, $http, $state) {
  $scope.message = 'to our adoption database!';
  $scope.add = function(pokemon) {
    $http.post('http://localhost:3000/animals', pokemon)
      .then(function(data){
        console.log(data);
      })
      .catch(function(error){
        console.log(error);
      });
      $state.go($state.current, {}, {reload: true});
  }
});
