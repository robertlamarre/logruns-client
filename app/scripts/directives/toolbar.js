'use strict';

angular.module('logrunsApp')
  .directive('toolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/toolbar-template.html',
      controller: function($scope, user) {
        user.getUser({
          success: function(data) {
            $scope.displayName = data.local.username;
          },
          error: function() {
            $scope.displayName = 'Sign in';
          }
        });
      }
    };
  });