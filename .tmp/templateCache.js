angular.module('karmaApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/login.html',
    "<div class=\"alert alert-danger\" ng-show=\"error\"> There was a problem logging in. Please try again. </div> <form role=\"form\" ng-submit=\"login()\"> <div class=\"form-group\"> <label for=\"username\">Username:</label> <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" ng-model=\"credentials.username\"> </div> <div class=\"form-group\"> <label for=\"password\">Password:</label> <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" ng-model=\"credentials.password\"> </div> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form> {{credentials}}"
  );


  $templateCache.put('views/main.html',
    "<div class=\"row\"> <h2>The Driver Is a driver:</h2> <p>{{driver}}</p> </div> <h1>Greeting</h1> <div ng-show=\"authenticated\"> <p>The ID is {{greeting.id}}</p> <p>The content is {{greeting.content}}</p> </div> <div ng-show=\"!authenticated\"> <p>Login to see your greeting</p> </div>"
  );

}]);
