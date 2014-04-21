'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, user) {
    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });
  });