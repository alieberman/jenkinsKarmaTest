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
