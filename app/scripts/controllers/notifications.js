'use strict';

angular.module('logrunsApp')
  .controller('NotificationsCtrl', function ($scope, user) {
    console.log('made it');

    var getEntries = function(person) {
      var entryIds = person.notifications.entries;
      if (entryIds.length === 0) {
        return;
      }
      user.getEntriesByIds({
        ids: entryIds,
        success: function(data) {
          console.log(data);
          $scope.entries = data;
        }
      });
    };

    $scope.getDate = function(date) {
      return moment(date).format('MMM DD, YYYY h:mm a');
    };

    user.getUser({
      success: function(person) {
        $scope.user = person;
        console.log(person);
        getEntries(person);
      }
    });


  });
