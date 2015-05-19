'use strict';

angular.module('logrunsApp')
  .directive('toolbar', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/toolbar-template.html',
      controller: function($rootScope, $scope, $document, $location, user) {
        $scope.items = [];
        $scope.loggedIn = false;
        $scope.attemptedLogin = false;
      
        $scope.search = function() {
          $location.path('/search/' + $scope.textSearch);
        };
        var init = function() {
          console.log( 'attempting login' );
          user.getUser({
            success: function(data) {
              $scope.href = '';
              $scope.user = data;
              $scope.loggedIn = true;
              console.log('logged in');
              $scope.attemptedLogin = true;
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
              console.log('error logging in');
              $scope.attemptedLogin = true;
            }
          });
        };
        init();
        //$scope.$on('$routeChangeSuccess', init);
      }
    };
  });