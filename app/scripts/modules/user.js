'use strict';

angular.module('logrunsApp')
  .factory('user', function($http) {

    var cache = {};

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
        cache.user = data;
        success(cache.user);
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
        cache.user = data;
        success(cache.user);
      }).error(error);

    };

    var logout = function(obj) {
      obj = obj || {};
      var success = obj.success || noop;
      var error = obj.error || noop;

      $http({
        method: 'GET',
        url: urlRoot + '/logout',
        withCredentials: true
      }).success(function() {
        cache.user = undefined;
        success();
      }).error(error);

    };

    var getUser = function(obj) {

      var success = obj.success || noop;
      var error = obj.error || noop;

      if (cache.user) {
        success(cache.user);
        return;
      }

      $http({
        method: 'GET',
        url: urlRoot + '/profile',
        withCredentials: true
      }).success(function(data) {
        cache.user = data.user;
        success(cache.user);
      }).error(error);

    };

    var getUsers = function(obj) {

      if (cache.users) {
        obj.success(cache.users);
        return;
      }

      $http({
        method: 'GET',
        url: urlRoot + '/users'
      }).success(function(data) {
        cache.users = data;
        obj.success(data);
      });

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

    var postEntry = function(obj) {

      $http({
        method: 'POST',
        url: urlRoot + '/entry',
        data: obj.entry,
        withCredentials: true
      }).success(function(data) {
        obj.success(data);
      }).error(function(data) {
        obj.error(data);
      });

    };

    var getEntry = function(obj) {
      $http({
        method: 'GET',
        url: urlRoot + '/entry',
        params: {
          id: obj.id
        }
      }).success(function(data) {
        obj.success(data);
      });

    };

    var getComments = function(obj) {
      $http({
        method: 'GET',
        url: urlRoot + '/comments',
        params: {
          entryId: obj.entryId,
        }
      }).success(obj.success);
    };

    var postComment = function(obj) {
      $http({
        method: 'POST',
        url: urlRoot + '/comment',
        data: obj.comment,
        withCredentials: true
      }).success(obj.success);
    };

    return {

      signup: signup,
      login: login,
      logout: logout,
      getUser: getUser,
      getUsers: getUsers,
      getEntries: getEntries,
      postEntry: postEntry,
      getEntry: getEntry,
      getComments: getComments,
      postComment: postComment

    };

  });