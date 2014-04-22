'use strict';

angular.module('logrunsApp')
  .controller('NewEntryCtrl', function ($scope, $location, user) {
    $scope.entry = {};
    $scope.submit = function() {
      console.log($scope.entry);
      user.postEntry({
        entry: $scope.entry,
        success: function(data) {
          console.log(data);
          $location.path('/');
        },
        error: function(data) {
          console.error('busted', data);
        }
      });
    };
  });
