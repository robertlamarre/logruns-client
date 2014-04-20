'use strict';

angular.module('logrunsApp')
  .controller('LoginCtrl', function ($scope, $location, user) {
    $scope.login = function() {
      if (!$scope.user) {
        return;
      }
      user.login({
        user: $scope.user,
        success: function() {
          $location.path('/');
        },
        error: function() {
          console.log('Invalid Credentials');
        }
      });
    };
  });
