'use strict';

angular.module('logrunsApp')
  .controller('EntryCtrl', function ($scope, $routeParams, $route, user, time) {

    user.getUser({
      success: function(data) {
        $scope.username = data.local.username;
      },
      error: function() {
        $scope.username = 'You must sign in to comment!';
      }
    });

    $scope.newcomment = {
      message: ''
    };

    user.getEntry({
      id: $routeParams.id,
      success: function(data) {
        $scope.entry = data;
      }
    });

    $scope.formatDate = function(date) {
      return moment(date).format('MMMM DD, YYYY');
    };


    $scope.postComment = function() {
      console.log('message', $scope.newcomment.message);
      $scope.newcomment.username = $scope.username;
      $scope.newcomment.date = moment();

      user.postComment({
        comment: $scope.newcomment,
        entryId: $scope.entry._id,
        success: function(data) {
          console.log(data);
          $route.reload();
        }
      });
    };

    $scope.getPace = function(distance, duration) {
      var pace = time.getPace({
        distance: distance,
        duration: duration,
        format: true
      });

      return pace;
    };

  });
