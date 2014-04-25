'use strict';

angular.module('logrunsApp')
  .controller('CalendarCtrl', function ($scope, $location, $routeParams, user) {

    $scope.date = moment();
    $scope.username = $routeParams.username;
    $scope.days = [];
    $scope.entryMap = {};
    console.log('User: ', $routeParams.username);

    var createEntryMap = function(entries) {
      var entryMap = {};
      _.each(entries, function(entry) {
        var key = moment(entry.date).zone(0).format('MMDDYYYY');
        if (!entryMap[key]) {
          entryMap[key] = [entry];
        } else {
          entryMap[key].push(entry);
        }
      });
      $scope.entryMap = entryMap;
      console.log(entryMap);
    };

    var getEntries = $scope.getEntries = function() {
      var start = $scope.date.clone().subtract('months',1).toISOString();
      var end = $scope.date.clone().add('months',1).toISOString();
      user.getEntries({
        username: $scope.username,
        startDate: start,
        endDate: end,
        success: function(entries) {
          $scope.entries = createEntryMap(entries);
        },
        error: function(error) {
          console.log(error);
        }
      });
    };

    getEntries();

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
          date: date.format('MMDDYYYY')
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
