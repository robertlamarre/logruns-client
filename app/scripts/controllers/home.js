'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, user) {

    $scope.account = 'Sign in';
    $scope.date = moment();

    user.getUsers({
      success: function(data) {
        $scope.users = data;
      }
    });

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

  });