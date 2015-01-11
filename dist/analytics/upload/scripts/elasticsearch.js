(function() {

	'use strict';

	var ES = window.ES = {};

	var client = new elasticsearch.Client({
    host: 'https://rowan-2412062.us-east-1.bonsai.io/',
    log: 'trace'
  });


  ES.indexRuns = function(runs) {
    var name = $('#name').val();
    var body = [];
    var actionDesc = { index:  { _index: 'runs', _type: 'patrick'} };

    _.each(runs, function(run) {
      body.push(actionDesc);
      body.push(run);
    });

    client.bulk({
      body: body
    }, function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        window.location.href = 'http://logruns.herokuapp.com/analytics/index.html';
      }
    });
  };

}());
