(function() {
  
  'use strict';

  var UNIT_CONVERSION_MAP = {
    m: 0.0006213712,
    km: 0.6213711922,
    mi: 1
  };

  var extractData = function(data) {
    var $contents = $(data.target.result);
    var runsJson = [];
    var runs = $contents.find('Event[typeName=Run]');

    runs.each(function(idx, val) {
      
      var $val = $(val);

      var $distance = $(val).find('distance');
      var unit = $distance.attr('unit');
      var distance = +$distance.html();
      var seconds = $val.find('duration').attr('seconds');

      if (!_.isNaN(distance)) {
        distance = distance * UNIT_CONVERSION_MAP[unit];
      }

      var run = {
        type: $val.attr('subtypename'),
        date: moment($val.attr('time')).toISOString(),
        distance: distance,
        unit: unit,
        notes: $val.find('notes').html(),
        route: $val.find('route').html(),
        seconds: seconds,
        pace: seconds / distance
      };
      
      runsJson.push(run);

    });

    ES.indexRuns(runsJson);
    
    
  };

  var getFile = function(inputEl) {

  	var filesList = inputEl.files;

  	if (filesList.length > 0) {

  		var file = filesList[0];
      
      var reader = new FileReader();
      reader.onload = extractData;
      reader.readAsText(file);

  	}
  };

  $('#logInput').on('change', function() {
  	getFile(this);
  });


}(jQuery));