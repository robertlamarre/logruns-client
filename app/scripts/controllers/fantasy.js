'use strict';

angular.module('logrunsApp')
  .controller('FantasyCtrl', function ($scope, user) {
    $scope.bet = {};
    $scope.submit = function() {
      user.postFantasy({
        fantasy: $scope.bet,
        success: function(data) {
          console.log(data);
        }
      });
    };
  });