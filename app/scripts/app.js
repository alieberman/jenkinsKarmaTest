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
  .config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain, * / *';
    $httpProvider.defaults.headers.get = { 'Authorization' : 'Basic QWFyb246bWFuYWdl' };
    $httpProvider.defaults.headers.options = { 'Authorization' : 'Basic QWFyb246bWFuYWdl' };
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function ($routeProvider) {
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
  });
