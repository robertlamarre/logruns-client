'use strict';

angular.module('logrunsApp')
  .controller('HomeCtrl', function ($scope, $location, user) {
    $scope.account = 'Sign in';
    $scope.date = moment();


    var getEntries = $scope.getEntries = function() {
      user.getEntries({
        startDate: $scope.date.startOf('month').toISOString(),
        endDate: $scope.date.endOf('month').toISOString(),
        success: function(entries) {
          $scope.entries = entries;
          console.log(entries);
        },
        error: function(error) {
          console.log(error);
        }
      });
    }

    $scope.getEntry = function(day) {
      if (!$scope.entries || !day) {
        return;
      }
      var entries = $scope.entries;
      var result = [];
      var inputDate = $scope.date.startOf('day').date(day);
      for (var i = 0; i < entries.length; ++i) {
        if (inputDate.isSame(entries[i].date, 'day')) {
          result.push(entries[i]);
        }
      }
      return result;
    };

    var setDate = function() {
      $scope.daysInMonth = new Array($scope.date.daysInMonth());
      $scope.dispDate = $scope.date.format('MMMM') + ' ' + $scope.date.year();
    };

    setDate();
    user.getUser({
      user: $scope.user,
      success: function(data) {
        $scope.account = data.local.username;
        getEntries();
      },
      error: function() {
        console.log('Not signed in');
        $scope.account = 'Sign In';
      }
    });

    var login = function() {
      $location.path('/login');
    };

    var logout = function() {
      $scope.account = 'Sign in';
      user.logout({
        success: function() {
          console.log('Successfully signed out');
        },
        error: function() {
          console.log('Error signing out');
        }
      });
    };

    $scope.logInOut = function() {
      if ($scope.account === 'Sign in') {
        login();
        return;
      }
      logout();
    };

    $scope.getDays = function() {
      var day = $scope.date.startOf('month').day()-1;
      day = day < 0 ? 6: day;
      var days = new Array(day);
      for (var i=0; i < $scope.date.daysInMonth(); ++i) {
        days.push(i+1);
      }
      return days;
    };

    $scope.getLastMonth = function() {
      $scope.date.subtract('months', 1);
      setDate();
    };

    $scope.getNextMonth = function() {
      $scope.date.add('months', 1);
      setDate();
    };
  });
