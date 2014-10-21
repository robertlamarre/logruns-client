'use strict';

angular.module('logrunsApp')
  .controller('AccountCtrl', function ($scope, $location, user) {

    user.getUser({
      success: function(data) {
        $scope.user = data;
        console.log(data);
      }
    });

    $scope.preview = function() {

      var file = $scope.inputFile;
      if (!file) {
        return;
      }
      var img = document.getElementsByTagName('img')[0];
      var reader = new FileReader();
      reader.onload = function(e) {img.src = e.target.result;};
      reader.readAsDataURL(file);

    };

    $scope.upload = function() {

      var file = $scope.inputFile;
      if (!file) {
        return;
      }
      var canvas = document.createElement('canvas');
      var img = document.getElementsByTagName('img')[0];
      if (!img.src) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      var MAX_WIDTH = 40;
      var MAX_HEIGHT = 40;
      var width = img.width;
      var height = img.height;
      console.log(width, height);
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, 40, 40);

      var dataurl = canvas.toDataURL('image/png');
      dataurl = dataurl.replace('data:image/png;base64,', '');
      user.setPicture({
        picture: dataurl,
        success: function(){
          $location.path('/');
        }
      });

    };

    function convertToMiles(distance, unit) {
      var unitMap = {
        km: 1.609344,
        m: 1609.344,
        mi: 1
      };

      var res = parseFloat(distance / unitMap[unit]);
      return res.toFixed(2);
    }

    $scope.importRA = function() {

      var reader = new FileReader();

      reader.onload = function(e) {

        var xmlData = $(e.target.result);
        xmlData.find('event').each(function(idx, val) {

          var distance = $(val).find('distance');
          var unit = distance.attr('unit');
          distance = distance.html();

          if (unit !== 'mi') {
            distance = convertToMiles(distance, unit);
          }

          if ($(val).attr('typename').toLowerCase() !== 'run') {
            return;
          }


          var res = {
            type: $(val).attr('subtypename'),
            date: new Date($(val).attr('time')),
            duration: $(val).find('duration').html(),
            distance: distance,
            notes: $(val).find('notes').html()
          };

          user.postEntry({
            entry: res,
            success: function() {
              console.log('posted');
            }
          });
        });

      };
      reader.readAsText($scope.raFile);
    };

  });