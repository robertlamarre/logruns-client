'use strict';

angular.module('logrunsApp')
  .controller('SignupCtrl', function ($scope, $location, user) {
    $scope.signup = function() {
      user.signup({
        user: $scope.user,
        success: function() {
          $location.path('/');
        },
        error: function() {
          console.log('Username ALREADY EXISTS');
        }
      });
    };
  });
