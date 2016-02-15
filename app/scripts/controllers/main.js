'use strict';

/**
 * @ngdoc function
 * @name karmaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the karmaApp
 */
angular.module('karmaApp')
  .controller('MainCtrl', function ($scope, Driver) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.driver = Driver.get();
  });
