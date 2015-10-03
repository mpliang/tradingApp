app.controller('trainerController', function ($scope, $http, $state) {
  $scope.message = 'Trainer List';

  $scope.delete = function(id) {
    $http.delete('http://localhost:3000/trainers/' + id)
      .then(function(data){
        $state.go($state.current, {}, {reload: true});
      })
      .catch(function(error){
        console.log(error);
      })
  }

  $http.get('http://localhost:3000/trainers/')
    .then(function(data){
      console.log(data);
      $scope.trainerList = data.data;
    })
    .catch(function(error){
      console.log(error);
    })
});
