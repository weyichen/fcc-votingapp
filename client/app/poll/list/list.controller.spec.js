'use strict';

describe('Controller: PollListCtrl', function () {

  // load the controller's module
  beforeEach(module('basejump1App'));

  var PollListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PollListCtrl = $controller('PollListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
