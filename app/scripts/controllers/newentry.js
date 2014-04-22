'use strict';

angular.module('logrunsApp')
  .controller('NewEntryCtrl', function ($scope, $location, user) {
    $scope.entry = {};

    user.getUser({
      success: function(data) {
        $scope.user = data;
      }
    });

    $scope.submit = function() {
      console.log($scope.entry);
      user.postEntry({
        entry: $scope.entry,
        success: function(data) {
          console.log(data);
          if ($scope.user) {
            $location.path('/u/' + $scope.user.local.username);
          }
        },
        error: function(data) {
          console.error('busted', data);
        }
      });
    };
  });
