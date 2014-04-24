'use strict';

angular.module('logrunsApp')
  .controller('EntryCtrl', function ($scope, $routeParams, $route, user) {

    user.getUser({
      success: function(data) {
        $scope.username = data.local.username;
      },
      error: function() {
        $scope.username = 'You must sign in to comment!';
      }
    });

    var getComments = function() {
      user.getComments({
        entryId: $scope.entries[0]._id,
        success: function(data) {
          $scope.comments = data;
        }
      });
    };

    $scope.newcomment = {
      message: ''
    };

    user.getEntry({
      id: $routeParams.id,
      success: function(data) {
        $scope.entries = data;
        getComments();
        $scope.newcomment.entryId = $scope.entries[0]._id;
      }
    });

    $scope.formatDate = function(date) {
      return moment(date).format('MMMM DD, YYYY');
    };


    $scope.postComment = function() {
      console.log('message', $scope.newcomment.message);

      user.postComment({
        comment: $scope.newcomment,
        success: function(data) {
          console.log(data);
          $route.reload();
        }
      });
    };

  });
