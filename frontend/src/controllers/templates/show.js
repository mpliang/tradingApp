app.controller('showController', function ($scope, $http, $stateParams) {
  $scope.message = 'Trainer';
  console.log($stateParams);

  $http.get('http://localhost:3000/trainers/' + $stateParams.trainerId)
    .then(function(data){
      console.log(data);
      $scope.trainer = data.data;
    })
    .catch(function(error){
      console.log(error);
    });

    $http.get('http://localhost:3000/animals/')
      .then(function(data){
        console.log(data);
        console.log(data.data);
        $scope.pokemonlist = data.data;
      })
      .catch(function(error){
        console.log(error);
      });

      $scope.adopt = function(pokemonId){
        console.log('http://localhost:8000/' + $stateParams.trainerId + '/adopt/' + pokemonId);
        $http.put('http://localhost:3000/trainers/' + $stateParams.trainerId + '/adopt/' + pokemonId)
          .then(function(data){
            console.log('adopted');
            console.log(data);
          })
          .catch(function(error){
            console.log(error);
          })
      }
});
