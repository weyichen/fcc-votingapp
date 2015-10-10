'use strict';

describe('Directive: testdirective', function () {

  // load the directive's module and view
  beforeEach(module('basejump1App'));
  beforeEach(module('app/testdirective/testdirective.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<testdirective></testdirective>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the testdirective directive');
  }));
});