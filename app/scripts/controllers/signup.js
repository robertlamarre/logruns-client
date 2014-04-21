'use strict';

angular.module('logrunsApp')
  .controller('SignupCtrl', function ($scope, $location, user) {
    $scope.signup = function() {
      user.signup({
        user: $scope.user,
        success: function(data) {
          $location.path('/u/' + data.local.username);
        },
        error: function() {
          console.log('Username ALREADY EXISTS');
        }
      });
    };
  });
