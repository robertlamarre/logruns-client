'use strict';

angular.module('logrunsApp')
  .controller('LogoutCtrl', function (user) {
    user.logout();
    console.log('made it');
  });
