'use strict';

angular.module('basejump1App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll', {
        templateUrl: 'app/poll/list/list.html',
        controller: 'PollListCtrl'
      })

      .when('/poll/new', {
        templateUrl: 'app/poll/edit/edit.html',
        controller: 'PollEditCtrl'
      })

      .when('/poll/show/:id', {
      	templateUrl: 'app/poll/show/show.html',
      	controller: 'PollShowCtrl'
      })

      .when('/poll/results/:id', {
        templateUrl: 'app/poll/results/results.html',
        controller: 'PollResultsCtrl'
      })

      .when('/poll/edit/:id', {
        templateUrl: 'app/poll/edit/edit.html',
        controller: 'PollEditCtrl'
      });
  });
