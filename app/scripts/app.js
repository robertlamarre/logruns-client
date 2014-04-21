'use strict';

var myModule = angular.module('logrunsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/u/:username', {
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
      .when('/entry/:date', {
        templateUrl: 'views/entry.html',
        controller: 'EntryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

myModule.factory('user', function($http) {
  var _user;
  var noop = function(){};
  var urlRoot = 'http://mysterious-ravine-3794.herokuapp.com';
  var signup = function(obj) {

    var success = obj.success || noop;
    var error = obj.error || noop;

    if (!obj.user) {
      error();
      return;
    }

    $http({
      method: 'POST',
      url: urlRoot + '/signup',
      data: obj.user,
      withCredentials: true
    }).success(function(data) {
      _user = data;
      success(_user);
    }).error(error);
  };

  var login = function(obj) {

    var success = obj.success || noop;
    var error = obj.error || noop;

    if (!obj.user) {
      error();
      return;
    }

    $http({
      method: 'POST',
      url: urlRoot + '/login',
      data: obj.user,
      withCredentials: true
    }).success(function(data) {
      console.log(data);
      _user = data;
      success(_user);
    }).error(error);
  };

  var getUser = function(obj) {

    var success = obj.success || noop;
    var error = obj.error || noop;

    if (_user) {
      success(_user);
    }

    $http({
      method: 'GET',
      url: urlRoot + '/profile',
      withCredentials: true
    }).success(function(data) {
      _user = data.user;
      success(_user);
    }).error(error);
  };

  var logout = function(obj) {

    var success = obj.success || noop;
    var error = obj.error || noop;

    $http({
      method: 'GET',
      url: urlRoot + '/logout',
      withCredentials: true
    }).success(function() {
      _user = undefined;
      success();
    }).error(error);

  };

  var getEntries = function(obj) {

    $http({
      method: 'GET',
      url: urlRoot + '/entries',
      params: {
        username: obj.username,
        startDate: obj.startDate,
        endDate: obj.endDate
      },
      withCredentials: true
    }).success(function(data) {
      obj.success(data);
    });

  };

  var getUsers = function(obj) {

    $http({
      method: 'GET',
      url: urlRoot + '/users'
    }).success(function(data) {
      obj.success(data);
    });

  };

  return {
    signup: signup,
    login: login,
    getUser: getUser,
    logout: logout,
    getEntries: getEntries,
    getUsers: getUsers
  };
});