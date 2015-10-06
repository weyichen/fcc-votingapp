'use strict';

angular.module('basejump1App')
  .controller('PollShowCtrl', function ($scope, $routeParams, $http, Auth) {
    $scope.errors = {};
    $scope.debug = true;

  	$scope.user = Auth.getCurrentUser();

    $scope.poll = {};
    $scope.answers = [];
    $scope.customInput = [];
    
    $http.get('/api/polls/' + $routeParams.id).success(function(poll) {
      $scope.poll = poll;
    });
    $scope.pollId = $routeParams.id;
    $scope.apiUrl = 'http://localhost:9000/api/polls/' + $scope.pollId;


  	$scope.submit = function() {
  		$scope.poll.responses.push({user: $scope.user._id, username: $scope.user.name, answers: $scope.answers});

      var questions = $scope.poll.questions;
      var aggregate = $scope.poll.aggregates;

      for (var i=0; i<questions.length; i++) {
        if (!aggregate[i])
          aggregate[i] = {};

        var answer = $scope.answers[i];

        switch(questions[i].type) {
          case 'text':
            aggregate[i] = count(aggregate[i], answer);
            break;
          case 'multitext':
            for (var prop in answer) {
              if (answer.hasOwnProperty(prop))
                if (!aggregate[i].hasOwnProperty(prop))
                  aggregate[i][prop] = {};
                aggregate[i][prop] = count(aggregate[i][prop], answer[prop]);
            }
            break;
          case 'mc':
            aggregate[i] = count(aggregate[i], answer);
            break;
          case 'ms':
            for (var prop in answer) {
              if (answer.hasOwnProperty(prop))
                aggregate[i] = count(aggregate[i], prop);
            }
            break;
          case 'scale':
            for (var prop in answer) {
              if (answer.hasOwnProperty(prop))
                aggregate[i] = average(aggregate[i], prop, answer[prop])
            }
            break;
          default:

        }
      }

  		updatePoll();
  	}

    function count(aggregate, prop) {
      var a = aggregate;
      (a.hasOwnProperty(prop)) ? a[prop] += 1 : a[prop] = 1;
      return a;
    }

    function average(aggregate, prop, value) {
      var a = aggregate;
      if (a.hasOwnProperty(prop)) {
        a[prop]['avg'] = (a[prop]['avg']*a[prop]['num'] + 1*value) / (a[prop]['num'] + 1);
        a[prop]['num']++;
      }
      else {
        a[prop] = {avg: value};
        a[prop]['num'] = 1;
      }
      return a;
    }

    function buildArray(obj) {
      var array = [];
      for (var prop in obj)
        if (obj.hasOwnProperty(prop))
          array.push({prop: prop, val: obj[prop]});
      return array;
    }

    $scope.clearResponses = function() {
      $scope.poll.responses = [];
      updatePoll();
    }

    $scope.clearAggregates = function() {
      $scope.poll.aggregates = [];
      updatePoll();
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