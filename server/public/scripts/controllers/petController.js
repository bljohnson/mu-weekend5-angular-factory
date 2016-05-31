myApp.controller('PetController', ['$scope', '$http', function($scope, $http) {
  var key = 'b900e0d5e332753a460a64eaa8de00fd';
  console.log(key);
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = 'hello';

  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    // query += '&animal=dog';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
        $scope.getBreeds();
      }
    )
  }

}]);
