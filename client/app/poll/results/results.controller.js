'use strict';

angular.module('basejump1App')
  .controller('PollResultsCtrl', function ($scope, $routeParams, $http, Auth) {
  	$scope.user = Auth.getCurrentUser();

  	$scope.poll = {};
  	$scope.errors = {};

  	$scope.radiobox;

  	$http.get('/api/polls/' + $routeParams.id).success(function(poll) {
  		$scope.poll = poll;
  	});

  });