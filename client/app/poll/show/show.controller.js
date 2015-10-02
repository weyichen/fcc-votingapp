'use strict';

angular.module('basejump1App')
  .controller('PollShowCtrl', function ($scope, $routeParams, $http, Auth) {
  	$scope.user = Auth.getCurrentUser();

  	$scope.poll = {};
  	$scope.errors = {};

  	$scope.radiobox;

  	$scope.response = [];

  	$http.get('/api/polls/' + $routeParams.id).success(function(poll) {
  		$scope.poll = poll;
  	});

  	$scope.submit = function() {
  		$scope.poll.responses.push({user: $scope.user._id, username: $scope.user.name, answers: $scope.response});

  		$http.put('api/polls/' + $routeParams.id, $scope.poll)
  		.then(function() {

  		})
  		.catch(function(err) {
    		$scope.errors.other = err.message;
    	});
  	}
  });