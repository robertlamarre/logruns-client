'use strict';

angular.module('logrunsApp')
  .directive('leaderboard', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/leaderboard-template.html',
      controller: function($scope, user) {
        
        user.getLeaderboard({
          success: function(data) {
            $scope.leaderboard = data;
          }
        });
        
      }
    };
  });