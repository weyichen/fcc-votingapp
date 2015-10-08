'use strict';

describe('Directive: debug', function () {

  // load the directive's module and view
  beforeEach(module('basejump1App'));
  beforeEach(module('app/debug/debug.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<debug></debug>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the debug directive');
  }));
});