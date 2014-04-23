'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, user) {
    $scope.account = 'Sign in';

    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });

  });