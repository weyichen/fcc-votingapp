'use strict';

angular.module('basejump1App')
  .controller('PollListCtrl', function ($scope, $http, Auth) {

    $scope.polls = {};
    $scope.errors = {};

    $scope.test = Auth.getCurrentUser;

    getPolls();

    function getPolls() {
        $http.get('/api/polls').success(function(polls) {
          $scope.polls = polls;
        });
    }

    $scope.deletePoll = function(n) {
        var poll = $scope.polls[n];
        $http.delete('/api/polls/' + poll._id);
        $scope.polls.splice(n, 1);
    }

  });
