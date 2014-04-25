'use strict';

angular.module('logrunsApp')
  .factory('time', function() {
    var validRegex = /^[\d\:\.]*$/;
    var getSeconds = function(time) {

      if (!validRegex.test(time)) {
        return 0;
      }

      var seconds = time.split(':');
      if (seconds.length > 3) {
        return 0;
      }

      seconds = _.reduce(seconds, function(memo, num, idx) {
        return memo + parseFloat(num) * (Math.pow(60,seconds.length - idx - 1));
      }, 0);

      return seconds;

    };

    var pad = function(n) {
      return (n < 10) ? ('0' + n) : n;
    };

    var getPace = function(obj) {
      if (!obj.duration || !obj.distance) {
        return '';
      }
      var seconds = getSeconds(obj.duration);
      var pace = seconds / parseFloat(obj.distance);
      var formatString = '';
      if (obj.format) {
        seconds = Number(pad(pace % 60)).toFixed(2);
        var minutes = parseInt(pace / 60) % 60;
        var hours = parseInt(pace / 3600) % 60;

        formatString = hours || '';

        if (formatString) {
          formatString += ':' + pad(minutes);
        } else {
          formatString = minutes || '';
        }
        if (formatString) {
          formatString += ':' + pad(seconds);
        } else  {
          return '';
        }
      }
      return formatString;

    };


    return {
      getSeconds: getSeconds,
      getPace: getPace
    };

  });