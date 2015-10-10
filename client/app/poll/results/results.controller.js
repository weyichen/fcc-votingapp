'use strict';

angular.module('basejump1App')
  .controller('PollResultsCtrl', function ($scope, $routeParams, $http, Auth) {


  	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  	
  	$scope.user = Auth.getCurrentUser();

  	$scope.poll = {};
  	$scope.errors = {};

  	$scope.radiobox;

  	$scope.apiUrl = '/api/polls/' + $routeParams.id;
  	$http.get($scope.apiUrl).success(function(poll) {
  		$scope.poll = poll;
  	});

  });