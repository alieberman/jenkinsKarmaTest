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
  .config(["$httpProvider", function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain, * / *';
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic QWFyb246bWFuYWdl' };
    $httpProvider.defaults.headers.options = { 'Authorization' : 'Basic QWFyb246bWFuYWdl' };
    $httpProvider.defaults.withCredentials = true;
  }])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
  .controller('MainCtrl', ["$scope", "Driver", "Greeting", function ($scope, Driver, Greeting) {
    $scope.greeting2 = {id: 'xxx', content: 'Hello World!'};
    $scope.driver = Driver.get();
    $scope.greeting = Greeting.get(function(res) {
      console.log(res);
    });
  }]);

'use strict';

angular.module('karmaApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$http", "User", "UserAuth", function ($scope, $rootScope, $location, $http, User, UserAuth) {

    $scope.authenticate = function(credentials, callback) {
      // console.log('authenticating');
      // console.log(credentials);
      // var headers = credentials ? {Authorization : "Basic " +
      // btoa(credentials.username + ":" + credentials.password)
      // } : {};
      // if (credentials) {
      //   var encodedAuth = "Basic " + btoa(credentials.username + ":" + credentials.password);
      //   $http.defaults.headers.common.Authorization = 'Basic ' + encodedAuth;
      //   UserAuth.setCredentials(credentials.username, credentials.password);
      //   User.get(function(res) {
      //     console.log(res);
      //     // UserAuth.setCredentials(credentials.username, credentials.password);
      //   });
      // }

      // console.log(encodedAuth);
      // if (credentials) {
      //   var encodedAuth = "Basic " + btoa(credentials.username + ":" + credentials.password);
      //   $http.get('http://localhost:8080/api/user', {headers : {'Authorization': encodedAuth}}).success(function(data) {
      //     if (data.name) {
      //       $rootScope.authenticated = true;
      //     } else {
      //       $rootScope.authenticated = false;
      //     }
      //     callback && callback();
      //   }).error(function() {
      //     $rootScope.authenticated = false;
      //     callback && callback();
      //   });
      // }
      var headers =
        {
          //Authorization : "Basic " + btoa('admin' + ":" + 'admin'),
          Authorization : 'Basic QWFyb246bWFuYWdl',
          Accept: 'application/json'
        };
      console.log(headers);
      $http.get('http://localhost:8080/api/resource', {headers : headers}).success(function(data) {
        if (data.name) {
          $rootScope.authenticated = true;
          console.log(data);
        } else {
          $rootScope.authenticated = false;
          console.log(data);
        }
        callback && callback();
      }).error(function() {
        $rootScope.authenticated = false;
        callback && callback();
      });
    };
    $scope.authenticate();
    $scope.credentials = {};

    //Login function
    $scope.login = function() {
      console.log('logging in');
      $scope.authenticate($scope.credentials, function() {
        if ($rootScope.authenticated) {
          $location.path("/");
          $scope.error = false;
        } else {
          $location.path("/login");
          $scope.error = true;
        }
      });
    };

    //Logout Function
    $scope.logout = function() {
      $http.post('logout', {}).finally(function() {
        $rootScope.authenticated = false;
        $location.path("/");
      });
    };
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

'use strict';

angular.module('karmaApp')
.factory('Greeting', ['$resource', function($resource) {
	var getGreeting = $resource('http://localhost:8080/api/greeting',
	{post: {method: 'POST'},
	get: {method: 'GET'},
	update: {method:'PUT'},
	query: {method:'GET', isArray:false}});
	return getGreeting;
}]);

'use strict';

angular.module('karmaApp')
.factory('User', ['$resource', function($resource) {
	var getUser = $resource('http://localhost:8080/api/user',
	{
		post: {method: 'POST'},
		get: {method: 'GET'},
		update: {method:'PUT'},
		query: {method:'GET', isArray:false}
	});
	return getUser;
}]);

'use strict';

angular.module('karmaApp')
.factory('UserAuth', ['$resource', '$http', function($resource, $http) {
  return {
    setCredentials: function (username, password) {
        // var encoded = Base64.encode(username + ':' + password);
        var encoded = btoa(username + ":" + password);
        console.log($http.defaults);
        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
    },
    getCredentials: function() {
      //$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');
    },
    clearCredentials: function () {
      $http.defaults.headers.common.Authorization = 'Basic ';
    },
    jokes: function () {
        return $resource('http://localhost:8080/api/user', null, {
            query: {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + 'myToken'
                }
            }
        })
    }
  };
}]);

angular.module('karmaApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/login.html',
    "<div class=\"alert alert-danger\" ng-show=\"error\"> There was a problem logging in. Please try again. </div> <form role=\"form\" ng-submit=\"login()\"> <div class=\"form-group\"> <label for=\"username\">Username:</label> <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" ng-model=\"credentials.username\"> </div> <div class=\"form-group\"> <label for=\"password\">Password:</label> <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"credentials.password\"> </div> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form> {{credentials}}"
  );


  $templateCache.put('views/main.html',
    "<div class=\"row\"> <h2>The Driver Is a driver:</h2> <p>{{driver}}</p> </div> <h1>Greeting</h1> <div ng-show=\"authenticated\"> <p>The ID is {{greeting.id}}</p> <p>The content is {{greeting.content}}</p> </div> <div ng-show=\"!authenticated\"> <p>Login to see your greeting</p> </div>"
  );

}]);
