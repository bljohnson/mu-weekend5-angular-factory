myApp.controller('PetController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('pet controller running');
  $scope.dataFactory = DataFactory;
  // animal vars
  $scope.selectedAnimal = '';
  $scope.animal = {};
  $scope.animalTypes = [
    {type: 'dog', label: 'Dog'},
    {type: 'cat', label: 'Cat'},
    {type: 'horse', label: 'Horse'},
    {type: 'reptile', label: 'Reptile'},
    {type: 'barnyard', label: 'Barnyard Animal'},
    {type: 'smallfurry', label: 'Small & Furry'},
  ];
  $scope.favCount = 0;

  if($scope.dataFactory.factoryGetFavorites() === undefined) {
    $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
      $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
    });
  } else {
    $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
  }

  $scope.findPet = function() {
    var key = 'b900e0d5e332753a460a64eaa8de00fd';
    var baseURL = 'http://api.petfinder.com/';

    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.selectedAnimal.type;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    // console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
      }
    )
  }

  $scope.addFavorite = function() {
    var favorite = {
      petfinderID: $scope.animal.id.$t,
      petName: $scope.animal.name.$t,
      petImageURL: '',
      description: $scope.animal.description.$t.substring(0, 100)
    };

    if($scope.animal.media.photos) {
      if($scope.animal.media.photos.photo[2].$t) {
        favorite.petImageURL = $scope.animal.media.photos.photo[2].$t;
      }
    }

    $scope.dataFactory.factorySaveFavorite(favorite).then(function() {
      console.log('done saving');
      $scope.favCount = $scope.dataFactory.factoryGetFavorites().length;
    });

  }

  function getFavorites() {
    $http.get('/favorite').then(function(response) {
      $scope.favCount = response.data.length;
    });
  }

}]);
