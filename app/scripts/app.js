'use strict';

angular.module('logrunsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngQuickDate'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/u/:username', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/u/:username/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/newentry/:date?', {
        templateUrl: 'views/newentry.html',
        controller: 'NewEntryCtrl'
      })
      .when('/entry/:id', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .when('/notifications', {
        templateUrl: 'views/notifications.html',
        controller: 'NotificationsCtrl'
      })
      .when('/u/:username/statistics', {
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl'
      })
      .when('/search/:text', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl'
      })
      .when('/fantasy', {
        templateUrl: 'views/fantasy.html',
        controller: 'FantasyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });