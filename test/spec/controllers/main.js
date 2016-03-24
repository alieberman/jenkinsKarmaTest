'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('karmaApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should expect awesome things to be a length of 3', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });
  it('array contains AngularJS', function () {
    expect(MainCtrl.awesomeThings).toEqual(jasmine.arrayContaining(['AngularJS']));
  });
});
