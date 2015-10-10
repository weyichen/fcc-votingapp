'use strict';

angular.module('basejump1App')
  .directive('testdirective', function () {
    return {
      templateUrl: 'app/testdirective/testdirective.html',
      restrict: 'EA',
      scope: false,
      transclude: false,
      link: function (scope, element, attrs) {
      	scope.element = element.children();

      	element.append('<textarea />')
      	scope.child = element.children();
      }
    };
  });