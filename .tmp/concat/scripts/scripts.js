'use strict';

/**
 * @ngdoc overview
 * @name karmaApp
 * @description
 * # karmaApp
 *
 * Main module of the application.
 */
angular
  .module('karmaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name karmaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the karmaApp
 */
angular.module('karmaApp')
  .controller('MainCtrl', ["$scope", "Driver", function ($scope, Driver) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.driver = Driver.get();
  }]);

'use strict';

angular.module('karmaApp')
.factory('Driver', ['$resource', function($resource) {
	var getDriver = $resource('http://thor.bigcompass.com:3456/api/driver',
	{post: {method: 'POST'},
	get: {method: 'GET'},
	update: {method:'PUT'},
	query: {method:'GET', isArray:false}});
	return getDriver;
}]);

angular.module('karmaApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div> <div class=\"row\"> <h2>The Driver Is:</h2> <p>{{driver}}</p> </div>"
  );

}]);
