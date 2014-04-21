'use strict';

angular.module('logrunsApp')
  .controller('LoginCtrl', function ($scope, $location, user) {
    $scope.login = function() {
      if (!$scope.user) {
        return;
      }
      user.login({
        user: $scope.user,
        success: function(data) {
          console.log(data);
          $location.path('/u/' + data.local.username);
        },
        error: function() {
          console.log('Invalid Credentials');
        }
      });
    };
  });
