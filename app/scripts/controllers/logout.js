'use strict';

angular.module('logrunsApp')
  .controller('LogoutCtrl', function (user, $location) {
    user.logout({
      success: function() {
        $location.path('/');
      }
    });
  });
