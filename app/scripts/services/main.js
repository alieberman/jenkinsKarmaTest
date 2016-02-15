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
