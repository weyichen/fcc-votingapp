'use strict';

describe('Directive: ptinput', function () {

  // load the directive's module and view
  beforeEach(module('basejump1App'));
  beforeEach(module('app/poll/ptinput/ptinput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ptinput></ptinput>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ptinput directive');
  }));
});