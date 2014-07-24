'use strict';

angular.module('logrunsApp')
  .directive('toolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/toolbar-template.html',
      controller: function($scope, $document, $location, user) {
        $scope.items = [];
        $scope.loggedIn = false;
        $scope.search = function() {
          $location.path('/search/' + $scope.textSearch);
        };
        var init = function() {
          user.getUser({
            cache: false,
            success: function(data) {
              $scope.href = '';
              $scope.user = data;
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