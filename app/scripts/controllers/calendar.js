'use strict';

angular.module('logrunsApp')
  .controller('CalendarCtrl', function ($scope, $location, $routeParams, user) {

    $scope.date = moment();
    $scope.username = $routeParams.username;
    $scope.days = [];
    console.log('User: ', $routeParams.username);

    var getEntries = $scope.getEntries = function() {
      user.getEntries({
        username: $scope.username,
        startDate: $scope.date.startOf('month').toISOString(),
        endDate: $scope.date.endOf('month').toISOString(),
        success: function(entries) {
          $scope.entries = entries;
        },
        error: function(error) {
          console.log(error);
        }
      });
    };

    getEntries();

    $scope.getEntry = function(date) {
      if (!$scope.entries || !date) {
        return;
      }
      date = moment(date).zone(0);
      var entries = $scope.entries;
      var result = [];
      for (var i = 0; i < entries.length; ++i) {
        if (date.isSame(entries[i].date, 'day')) {
          result.push(entries[i]);
          console.log(entries[i]);
        }
      }
      return result;
    };

    var setDate = function() {
      $scope.daysInMonth = new Array($scope.date.daysInMonth());
      $scope.dispDate = $scope.date.format('MMMM') + ' ' + $scope.date.year();
    };

    setDate();

    var getCalendar = function() {
      var date = $scope.date.clone();
      var daysBack = date.startOf('month').day() - 1;
      date.subtract('days', daysBack);
      var days = [];
      var month = $scope.date.month();
      var styleClass = 'active';
      for (var i = 0; i < 42; i++) {
        if (month === date.month()) {
          styleClass = 'active';
        } else {
          styleClass = 'inactive';
        }
        days.push({
          day: date.date(),
          style: styleClass,
          date: date.format('MM-DD-YYYY')
        });
        date.add('days',1);
      }
      $scope.days = days;
    };

    getCalendar();

    $scope.getLastMonth = function() {
      $scope.date.subtract('months', 1);
      getCalendar();
      setDate();
    };

    $scope.getNextMonth = function() {
      $scope.date.add('months', 1);
      getCalendar();
      setDate();
    };
  });
