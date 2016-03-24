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
