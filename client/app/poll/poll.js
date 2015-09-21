'use strict';

angular.module('basejump1App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      })

      .when('/poll/:id', {
      	templateUrl: 'app/poll/show/show.html',
      	controller: 'PollShowCtrl'
      });
  });
