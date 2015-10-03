'use strict';

angular.module('basejump1App')
  .controller('PollEditCtrl', function ($scope, $routeParams, $http, Auth) {
    $scope.types = {
      'Text': 'text',
      'Comment': 'comment',
      'Multiple Choice': 'mc',
      'Multiple Select': 'ms',
      'Multiple Text': 'multitext',
      'Scale': 'scale',
      'Rank': 'rank'
    };

  	$scope.poll = {questions: []};
    $scope.ph = {};

    $scope.debug = false;
  	$scope.errors = {};

    // get existing poll if user is editing one
    if ($routeParams.id) {
    	$http.get('/api/polls/' + $routeParams.id).success(function(poll) {
    		$scope.poll = poll;
    	});
      $scope.pollId = $routeParams.id;
      $scope.apiUrl = 'http://localhost:9000/api/polls/' + $scope.pollId;
    }

    $scope.addQuestion = function(n) {
      // insert a question before the specified position, or if no index is provided, insert at the end
      if (Number.isInteger(n)) {

      } else {
        $scope.poll.questions.push({type: $scope.newQType});
        setType($scope.newQType, $scope.poll.questions.length - 1);
      }
    }

    $scope.changeType = function(n) {
      setType($scope.poll.questions[n].type, n);
    }

    $scope.deleteQuestion = function(n) {
      $scope.poll.questions.splice(n, 1);
    }

    $scope.addChoice = function(n) {
        $scope.poll.questions[n].choices.labels.push('');
    }

    $scope.deleteChoice = function(i, j) {
        $scope.poll.questions[i].choices.labels.splice(j, 1);
    }

    $scope.addPoll = function() {
      $scope.poll.author = Auth.getCurrentUser()._id;
      $scope.poll.authorname = Auth.getCurrentUser().name;

      $http.post('api/polls', $scope.poll)
      .then(function() {
        $scope.poll = {};
      })
      .catch(function(err) {
        $scope.errors.other = err.message;
      });
    }

  	$scope.editPoll = function() {
      
  		$http.put('api/polls/' + $routeParams.id, $scope.poll)
      // retrieve newly updated object with MongoDB id so that it can be updated again without refreshing
      .success(function(updatedPoll) {
        $scope.poll = updatedPoll;
      })

  		.then(function(response) {
        
  		}, function errorCallback(response) {
        $scope.errors.put = response;
      })

  		.catch(function(err) {
    		$scope.errors.other = err.message;
    	});
  	}

    function setType(type, n) {
      switch(type) {
        case 'mc':
          $scope.poll.questions[n].choices = {custom: false, labels: []};
          break;
        case 'ms':
          $scope.poll.questions[n].choices = {custom: false, labels: []};
          break;
        case 'multitext':
          $scope.poll.questions[n].choices = {labels: []};
          break;
        case 'scale':
          $scope.poll.questions[n].choices = {max: 5, step: 1, labels: []};
          break;
        case 'rank':
          $scope.poll.questions[n].choices = {labels: []};
          break;
        default:
          $scope.poll.questions[n].choices = null;
      }
    }

    // examples for input fields and different question types
    $scope.ph = {
      title: "Best Poll Ever",
      description: "Imma let you finish, but this poll is the best poll of all time!",

      prompt: {
        text: "What is your name?",
        comment: "Please let us know if you have any comments or suggestions.",
        mc: "What is your favorite ice cream flavor?",
        ms: "Which of these operating systems do you use?",
        multitext: "What is the first word that comes to mind for each of these products?",
        scale: "On a scale of 1 (least interested) to 5 (most interested), please indicate your level of interest in each of these.",
        rank: "Please rank these clothing brands from your favorite to least favorite."
      },

      choices: {
        mc: ["Vanilla", "Chocolate", "Strawberry", "Mint Chocolate Chip"],
        ms: ["Windows", "OS X", "Linux", "iOS", "Android"],
        multitext: ["Coca-Cola", "Pepsi", "Sprite", "7-Up", "Fanta", "Orangina"],
        scale: ["Skydiving", "Rock Climbing", "Mountain Biking", "Skiing", "Scuba Diving", "Freerunning"],
        rank: ["H&M", "Forever 21", "Gap", "Abercrombie & Fitch", "Diesel", "Levi's", "Aeropostale"]
      }
    }
  });