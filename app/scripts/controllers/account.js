'use strict';

angular.module('logrunsApp')
  .controller('AccountCtrl', function ($scope, user) {

    user.getUser({
      success: function(data) {
        $scope.user = data;
        console.log(data);
      }
    });

  });