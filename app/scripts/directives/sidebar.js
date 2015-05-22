'use strict';

angular.module('logrunsApp')
  .directive('sidebar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/sidebar-template.html',
      controller: function($rootScope, $scope, $document, $location, user) {
        var init = function() {
          user.getUser({
            success: function(data) {
              $scope.user = data;
              console.log(data);
              $scope.loggedIn = true;
            },
            error: function() {
              $scope.loggedIn = false;
            }
          });
        };
        init();
      }
    };
  });