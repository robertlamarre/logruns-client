'use strict';

angular.module('logrunsApp')
  .controller('NewEntryCtrl', function ($scope, $location, $routeParams, user, time) {

    $scope.value = new Date(2013, 9, 22);
    $scope.entry = {
      type: 'Easy',
      date: $routeParams.date || new Date()
    };

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

    $scope.getPace = function() {
      var pace = time.getPace({
        distance: $scope.entry.distance,
        duration: $scope.entry.duration,
        format: true
      });

      return pace;
    };
  });
