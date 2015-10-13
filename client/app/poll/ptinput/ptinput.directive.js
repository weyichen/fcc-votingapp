'use strict';

angular.module('basejump1App')
	.directive('ptinput', function () {
	return {
		templateUrl: 'app/poll/ptinput/ptinput.html',
		restrict: 'EA',
		scope: {
			name: '@',
			label: '@',
			placeholder: '=',
			model: '=',
			error: '='
		},

		link: function (scope, element, attrs) {
		}	  
	};
	});