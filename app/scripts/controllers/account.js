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
      ctx.drawImage(img, 0, 0, width, height);

      var dataurl = canvas.toDataURL('image/png');
      dataurl = dataurl.replace('data:image/png;base64,', '');
      user.setPicture({
        picture: dataurl,
        success: function(){
          $location.path('/');
        }
      });

    };

  });