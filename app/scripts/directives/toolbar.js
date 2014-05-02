'use strict';

angular.module('logrunsApp')
  .directive('toolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/toolbar-template.html',
      controller: function($scope, $document, user) {
        $scope.items = [];
        $scope.loggedIn = false;
        var init = function() {
          user.getUser({
            success: function(data) {
              $scope.href = '';
              $scope.displayName = data.local.username;
              $scope.loggedIn = true;
              $scope.items = [{
                text: 'Notifications',
                href: '#/notifications'
              },
              {
                text: 'Logout',
                href: '#/logout'
              }];
            },
            error: function() {
              $scope.items = [];
              $scope.loggedIn = false;
            }
          });
        };

        $scope.$on('$routeChangeSuccess', init);
      }
    };
  });