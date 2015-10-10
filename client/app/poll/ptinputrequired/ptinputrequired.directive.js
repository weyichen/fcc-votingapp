'use strict';

angular.module('basejump1App')
  .directive('ptinputrequired', function () {
    return {
      templateUrl: 'app/poll/ptinputrequired/ptinputrequired.html',
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs) {
      	scope.name = attrs.name;
      	scope.label = attrs.label;

      	scope.element = element;
      }
    };
  });