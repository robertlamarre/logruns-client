'use strict';

angular.module('logrunsApp')
  .controller('SearchCtrl', function ($scope, $routeParams, $timeout, user) {
    $scope.text = $routeParams.text;

    user.searchEntriesForText({
      text: $routeParams.text,
      success: function(data) {
        $scope.entries = data;
        $timeout(function() {
          var regex = new RegExp('(' + $scope.text + ')', 'i');
          $('.blockquote').each(function(idx, val) {
            var html = $(val).html().replace(regex, '<span class="hit">$1</span>');
            $(val).html(html);
          });
        });
      }
    });


  });