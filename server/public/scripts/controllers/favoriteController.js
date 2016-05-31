myApp.controller('FavoriteController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('favorite controller running');
  $scope.dataFactory = DataFactory;

  $scope.favorites = [];
  $scope.favCount = 0;

  if($scope.dataFactory.factoryGetFavorites() === undefined) {
    $scope.dataFactory.factoryRefreshFavoriteData().then(function() {
      $scope.favorites = $scope.dataFactory.factoryGetFavorites();
      $scope.favCount = $scope.favorites.length;
    });
  } else {
    $scope.favorites = $scope.dataFactory.factoryGetFavorites();
    $scope.favCount = $scope.favorites.length;
  }

}]);
