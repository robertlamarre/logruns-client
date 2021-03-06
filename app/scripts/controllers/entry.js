'use strict';

angular.module('logrunsApp')
  .controller('EntryCtrl', function ($scope, $routeParams, $route, $sce, $location, user, time) {

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
      return moment(date).zone(0).format('MMMM DD, YYYY');
    };

    $scope.formatNotes = function(notes) {
      if (!notes) {
        return;
      }
      return $sce.trustAsHtml(notes.replace(/\n/g, '<br/>'));
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

    $scope.submit = function() {
      console.log($scope.entry);
      user.updateEntry({
        id: $routeParams.id,
        entry: $scope.entry,
        success: function(data) {
          console.log(data);
          if ($scope.user) {
            $location.path('/u/' + $scope.user.local.username + '/calendar');
          }
        },
        error: function(data) {
          console.error('busted', data);
        }
      });
    };

    $scope.edit = function() {
      $location.path( $location.path() + '/edit' );
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
