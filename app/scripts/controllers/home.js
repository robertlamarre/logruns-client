'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, user, $location) {
    $scope.account = 'Sign in';

    user.getUser({
      success: function(data) {
        $scope.account = data.local.username;
      }
    });

    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });

    var login = function() {
      $location.path('/login');
    };

    var logout = function() {
      $scope.account = 'Sign in';
      user.logout({
        success: function() {
          console.log('Successfully signed out');
        },
        error: function() {
          console.log('Error signing out');
        }
      });
    };

    $scope.logInOut = function() {
      if ($scope.account.toLowerCase() === 'sign in') {
        login();
        return;
      }
      logout();
    };
  });