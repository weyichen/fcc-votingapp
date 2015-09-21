'use strict';

angular.module('basejump1App')
  .controller('PollShowCtrl', function ($scope, $routeParams, $http, Auth) {
  	$scope.poll = {};
  	$http.get('/api/polls/' + $routeParams.id).success(function(poll) {
  		$scope.poll = poll;
  	})
  });