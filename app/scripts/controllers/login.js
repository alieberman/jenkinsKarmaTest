'use strict';

angular.module('karmaApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $http, User, UserAuth) {

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
  });
