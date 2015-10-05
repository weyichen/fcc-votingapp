'use strict';

angular.module('basejump1App')
  .controller('PollShowCtrl', function ($scope, $routeParams, $http, Auth) {
    $scope.errors = {};
    $scope.debug = true;

  	$scope.user = Auth.getCurrentUser();

    $scope.poll = {};
    $scope.answers = [];
    $scope.customInput = [];

  	$scope.radiobox;
  	
    
    $http.get('/api/polls/' + $routeParams.id).success(function(poll) {
      $scope.poll = poll;
    });
    $scope.pollId = $routeParams.id;
    $scope.apiUrl = 'http://localhost:9000/api/polls/' + $scope.pollId;


    $scope.clearResponses = function() {
      $scope.poll.responses = [];

      // TODO: clean up this mess
      for (var i=0; i<$scope.poll.questions.length; i++) {
        if ($scope.poll.aggregates[i])
          $scope.poll.aggregates[i] = {};
      }

      updatePoll();
    }

  	$scope.submit = function() {
  		$scope.poll.responses.push({user: $scope.user._id, username: $scope.user.name, answers: $scope.answers});

      for (var i=0; i<$scope.poll.questions.length; i++) {
        if (!$scope.poll.aggregates[i])
          $scope.poll.aggregates[i] = {};

          var answer = $scope.answers[i];

        switch($scope.poll.questions[i].type) {
          case 'mc':
            addCount(i, answer);
            break;
          case 'ms':
            for (var select in answer)
              if (answer.hasOwnProperty(select))
                addCount(i, select);
            break;
          case 'text':
            
          default:

        }
      }
      //$scope.poll.aggregates.push();

  		updatePoll();
  	}

    function addCount(n, response) {
      if ($scope.poll.aggregates[n].hasOwnProperty(response))
        $scope.poll.aggregates[n][response] += 1;
      else
        $scope.poll.aggregates[n][response] = 1;
    }
 
    function updatePoll() {
      $http.put('api/polls/' + $routeParams.id, $scope.poll)
      // retrieve newly updated object with MongoDB id so that it can be updated again without refreshing
      .success(function(updatedPoll) {
        $scope.poll = updatedPoll;
      })
      .then(function() {

      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }
  });