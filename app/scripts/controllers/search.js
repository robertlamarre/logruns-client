'use strict';

angular.module('logrunsApp')
  .controller('SearchCtrl', function ($scope, $routeParams, user) {
    $scope.text = $routeParams.text;

    user.searchEntriesForText({
      text: $routeParams.text,
      success: function(data) {
        $scope.entries = data;
      }
    });


  });