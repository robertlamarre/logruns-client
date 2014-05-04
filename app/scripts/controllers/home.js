'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, $route, user) {

    $scope.date = moment();
    $scope.newComment = {};

    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });

    user.getUser({
      success: function(data) {
        $scope._user = data;
      }
    });

    $scope.postComment = function(entryId) {

      var newcomment = {
        username: $scope.user.local.username,
        message: $scope.newComment[entryId],
        date: moment()
      };

      user.postComment({
        comment: newcomment,
        entryId: entryId,
        success: function(data) {
          console.log(data);
          $scope.newComment[entryId] = '';
          $scope.entries.every(function(ent) {
            if (ent._id === entryId) {
              ent.comments.push(newcomment);
              return false;
            }
            return true;
          });
        }
      });

    };

    user.getEntries({
      startDate: $scope.date.startOf('month').toISOString(),
      endDate: $scope.date.endOf('month').toISOString(),
      success: function(entries) {
        $scope.entries = entries;
      },
      error: function(error) {
        console.log(error);
      }
    });

    $scope.getDate = function(date) {
      return moment(date).format('MMM DD, YYYY h:mm a');
    };

  });