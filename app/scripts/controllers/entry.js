'use strict';

angular.module('logrunsApp')
  .controller('EntryCtrl', function ($scope, $http, $location) {
    $scope.entry = {};
    var urlRoot = 'http://mysterious-ravine-3794.herokuapp.com';
    $scope.submit = function() {
      console.log($scope.entry);
      $http({
        method: 'POST',
        url: urlRoot + '/entry',
        data: $scope.entry,
        withCredentials: true
      }).success(function(data) {
        console.log('POSTED!');
        console.log(data);
        $location.path('/');
      }).error(function() {
        console.log('BUSTED');
      });
    };
  });
