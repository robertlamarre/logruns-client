'use strict';

angular.module('logrunsApp')
  .directive('toolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/toolbar-template.html',
      controller: function($scope, $document, user) {
        $scope.items = [];
        var init = function() {
          user.getUser({
            success: function(data) {
              $scope.href = '';
              $scope.displayName = data.local.username;
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
            }
          });
        };

        $scope.$on('$routeChangeSuccess', init);
      }
    };
  });