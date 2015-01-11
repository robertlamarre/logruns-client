(function() {

  'use strict';

  var ES = window.ES = {};

  var client = new elasticsearch.Client({
    host: 'https://nvbh8t0i:6j6ysua2k1yx726t@rowan-2412062.us-east-1.bonsai.io:443/',
    log: 'trace'
  });


  ES.indexRuns = function(runs) {
    var name = $('#name').val();
    var body = [];
    var actionDesc = { index:  { _index: 'runs', _type: name} };

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
