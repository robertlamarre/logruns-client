'use strict';

angular.module('logrunsApp')
  .factory('user', function($http) {

    var cache = {
      pictures: {}
    };

    var noop = function(){};
    var urlRoot = 'http://mysterious-ravine-3794.herokuapp.com';

    var getUrlRoot = function() {
      return urlRoot;
    };

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
      obj.cache = typeof obj.cache === 'undefined' ? true : obj.cache;
      if (obj.cache && cache.user) {
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

    var getPictureUrl = function(obj) {
      obj.success = obj.success || noop;
      obj.error = obj.error || noop;

      if (!obj.id) {
        this.getUser({
          success: function(usr) {
            obj.success(urlRoot + '/pictures/' + usr._id);
          },
          error: function() {
            obj.error();
          }
        });
      } else {
        obj.success(urlRoot + '/pictures/' + obj.id);
      }
    };

    var getPicture = function(obj) {
      var success = obj.success || noop;
      var error = obj.error || noop;

      if (!obj.id) {
        error();
        return;
      }
      if (cache.pictures[obj.id]) {
        obj.success(cache.pictures[obj.id]);
        return;
      }

      $http({
        method: 'GET',
        url: urlRoot + '/pictures/' + obj.id
      }).success(function(data) {
        success(data);
        console.log('SUCCESS!');
      }).error(error);

    };

    var setPicture = function(obj) {
      $http({
        method: 'POST',
        url: urlRoot + '/picture',
        data: {
          picture: obj.picture
        },
        withCredentials: true
      }).success(function() {
        obj.success();
      });
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

    var searchEntriesForText = function(obj) {
      $http({
        method: 'GET',
        url: urlRoot + '/search',
        params: {
          text: obj.text
        }
      }).success(function(data) {
        obj.success(data);
      });
    };

    var getStreak = function(obj) {
      $http({
        method: 'GET',
        url: urlRoot + '/streak',
        params: {
          username: obj.username
        }
      }).success(function(data) {
        obj.success(data);
      });
    };

    var getStats = function(obj) {
      $http({
        method: 'GET',
        url: urlRoot + '/stats',
        params: {
          username: obj.username
        }
      }).success(function(data) {
        obj.success(data);
      });
    };

    var getEntriesByIds = function(obj) {
      $http({
        method: 'POST',
        url: urlRoot + '/entriesByIds',
        data: {
          ids: obj.ids
        },
        withCredentials: true
      }).success(function(data) {
        obj.success(data);
      });
    };

    var postFantasy = function(obj) {
      var success = obj.success || noop;
      var error = obj.error || noop;

      $http({
        method: 'POST',
        url: urlRoot + '/fantasy',
        data: obj.fantasy,
        withCredentials: true
      }).success(success).error(error);
    };

    var postEntry = function(obj) {

      var success = obj.success || noop;
      var error = obj.error || noop;

      $http({
        method: 'POST',
        url: urlRoot + '/entry',
        data: obj.entry,
        withCredentials: true
      }).success(function(data) {
        success(data);
      }).error(function(data) {
        error(data);
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
        data: {
          comment: obj.comment,
          entryId: obj.entryId
        },
        withCredentials: true
      }).success(obj.success);
    };

    return {

      signup: signup,
      login: login,
      logout: logout,
      getUser: getUser,
      getPicture: getPicture,
      getPictureUrl: getPictureUrl,
      getUsers: getUsers,
      getEntries: getEntries,
      getEntriesByIds: getEntriesByIds,
      postEntry: postEntry,
      getEntry: getEntry,
      getComments: getComments,
      postComment: postComment,
      getStats: getStats,
      getStreak: getStreak,
      setPicture: setPicture,
      searchEntriesForText: searchEntriesForText,
      getUrlRoot: getUrlRoot,
      postFantasy: postFantasy

    };

  });
