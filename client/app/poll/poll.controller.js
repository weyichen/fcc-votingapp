'use strict';

angular.module('basejump1App')
  .controller('PollCtrl', function ($scope, $http, Auth) {
    $scope.poll = {title: 'Quick Poll 1', desc: 'I promise this will be quick!'};

    var mockQuestion = {prompt: "Question", type: "text", choices: ['1']};
    $scope.pollQuestions = [mockQuestion];

    $scope.polls = {};
    $scope.errors = {};

    $scope.test = Auth.getCurrentUser();

    getPolls();

    function getPolls() {
        $http.get('/api/polls').success(function(polls) {
          $scope.polls = polls;
        });
    }

    $scope.addQuestion = function() {
        $scope.pollQuestions.push(mockQuestion);
    }

    $scope.deleteQuestion = function(n) {
        $scope.pollQuestions.splice(n, 1);
    }

    $scope.toggleType = function(n) {
        if ($scope.pollQuestions[n].type === 'text') {
            $scope.pollQuestions[n].type = 'mc';
        } else {
            $scope.pollQuestions[n].type = 'text';
        }
    }

    $scope.addChoice = function(n) {
        $scope.pollQuestions[n].choices.push('a');
    }

    $scope.deleteChoice = function(i, j) {
        $scope.pollQuestions[i].choices.splice(j, 1);
    }


    $scope.addPoll = function() {
    	$http.post('api/polls', {
    		title: $scope.poll.title,
            author: Auth.getCurrentUser()._id,
            authorname: Auth.getCurrentUser().name,
            desc: $scope.poll.desc,
            questions: $scope.pollQuestions
    	})
    	.then(function() {
    		$scope.poll = {};
            getPolls();
    	})
    	.catch(function(err) {
    		$scope.errors.other = err.message;
    	});
    }

    $scope.deletePoll = function(n) {
        var poll = $scope.polls[n];
        $http.delete('/api/polls/' + poll._id);
        $scope.polls.splice(n, 1);
    }


  });
