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
          window.history.back();
        },
        error: function() {
          console.log('Invalid Credentials');
        }
      });
    };
  });
