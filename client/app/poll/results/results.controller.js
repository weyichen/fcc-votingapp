'use strict';

angular.module('basejump1App')
  .controller('PollResultsCtrl', function ($scope, $routeParams, $http, Auth) {
  	$scope.debug = true;
  	
  	$scope.user = Auth.getCurrentUser();

  	$scope.poll = {};
  	$scope.errors = {};

  	$scope.radiobox;

  	$scope.apiUrl = '/api/polls/' + $routeParams.id;
  	$http.get($scope.apiUrl).success(function(poll) {
  		$scope.poll = poll;
  		for (var i=0; i<$scope.poll.aggregates.length; i++) {
  			$scope.getData(i);
  		}
  	});

  	$scope.chartData = [], $scope.chartLabels = [];

  	$scope.getData = function(n) {
  		var aggregate = $scope.poll.aggregates[n];

  		$scope.chartData.push([]);
  		$scope.chartLabels.push([]);

  		for (var label in aggregate) {
  			if (aggregate.hasOwnProperty(label)) {

  				var dt, lb;
  				switch($scope.poll.questions[n].type) {
  					case 'mc':
  					case 'ms':
  					case 'text':
  						dt = aggregate[label];
  						lb = label;
  						break;
  					case 'scale':
  						dt = aggregate[label].avg;
  						lb = label;
  						break;
  					case 'multitext':
  						dt = [], lb = [];
  						for (var answer in aggregate[label]) {
  							if (aggregate[label].hasOwnProperty(answer)) {
  								dt.push(aggregate[label][answer]);
  								lb.push(answer);
  							}
  						}
  						break;
  				}
  				$scope.chartData[n].push(dt);
  				$scope.chartLabels[n].push(lb);
  			}
  		}
  	};

  });