'use strict';

angular.module('logrunsApp')
  .controller('AccountCtrl', function ($scope, $route, user) {

    user.getUser({
      success: function(data) {
        $scope.user = data;
        console.log(data);
      }
    });

    function uploadFile(file, signedRequest, url){
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function() {
        if (xhr.status === 200) {
          user.setPictureUrl({
            url: url,
            success: function(){
              $route.reload();
            }
          });
        } else {
          window.alert('Error uploading picture');
        }
      };
      xhr.send(file);
    }
    $scope.upload = function() {

      var file = $scope.inputFile;
      if (!file) {
        return;
      }
      user.getSignedRequest({
        filename: file.name,
        filetype: file.type,
        success: function(data) {
          uploadFile(file, data.signedRequest, data.url);
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