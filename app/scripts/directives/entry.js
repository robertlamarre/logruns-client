'use strict';

angular.module('logrunsApp')
  .directive('entry', function() {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/entry-template.html',
      controller: function($scope, $sce, user) {

        $scope.user = $scope.$parent.user;

        $scope.getDate = function(date) {
          return moment(date).zone(0).format('MMM DD, YYYY');
        };

        $scope.formatNotes = function(notes) {
          if (!notes) {
            return;
          }
          return $sce.trustAsHtml(notes.replace(/\n/g, '<br/>'));
        };

        $scope.getDateTime = function(date) {
          return moment(date).format('MMM DD, YYYY h:mm a');
        };

        var urlRoot = user.getUrlRoot();
        $scope.getPicUrl = function(username) {
          console.log(urlRoot + username);
          return urlRoot + '/pictures/' + username;
        };

        $scope.postComment = function() {

          var newcomment = {
            username: $scope.user.local.username,
            message: $scope.newcomment.message,
            date: moment()
          };

          user.postComment({
            comment: newcomment,
            entryId: $scope.entry._id,
            success: function() {
              $scope.newcomment.message = '';
              $scope.entry.comments.push(newcomment);
            }
          });

        };

      },
      link: function($scope, element, attr) {
        $scope.entry = $scope.entry || attr.data;
      }
    };
  });