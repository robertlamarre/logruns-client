'use strict';

angular.module('logrunsApp')
  .controller('SearchCtrl', function ($scope, $routeParams, user) {
    console.log($routeParams);
    user.searchEntriesForText({
      text: $routeParams.text,
      success: function(data) {
        $scope.entries = data;
      }
    });


  });