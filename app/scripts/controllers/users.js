'use strict';

angular.module('logrunsApp')
  .controller('UsersCtrl', function ($scope, user) {

    $scope.account = 'Sign in';
    $scope.date = moment();

    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });

  });