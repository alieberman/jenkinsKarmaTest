'use strict';

/**
 * @ngdoc function
 * @name karmaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the karmaApp
 */
angular.module('karmaApp')
  .controller('MainCtrl', function ($scope, Driver, Greeting) {
    //$scope.greeting = {id: 'xxx', content: 'Hello World!'};
    $scope.driver = Driver.get();
    $scope.greeting = Greeting.get(function(res) {
      console.log(res);
    });
  });
