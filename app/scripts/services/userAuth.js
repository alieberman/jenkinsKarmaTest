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
