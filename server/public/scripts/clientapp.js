var myApp = angular.module('myApp', ['ngRoute']);
// ng routing
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/pet', {
      templateUrl: '/views/pet.html',
      controller: 'PetController'
    })
    .when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: 'FavoriteController'
    })
    .otherwise({
      redirectTo: '/pet'
    })
}]);
