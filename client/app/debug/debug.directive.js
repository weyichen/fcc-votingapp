'use strict';

angular.module('basejump1App')

  .directive('ptdebug', function () {
    return {
      templateUrl: 'app/debug/debug.html',
      restrict: 'EA',
      transclude: true,
      link: function (scope, element, attrs) {
      }
    };
  });