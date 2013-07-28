var express = require('express');
var app = express();
app.use(express.bodyParser());
var nohm = require('nohm').Nohm;

if (process.env.REDISTOGO_URL) {
  // inside if statement
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  var redis = require("redis").createClient();
}

redis.on("connect", function(){
  nohm.setClient(redis);
  console.log("Nohm Conneted to Redis Client");
  console.log(port);
});


var port = process.env.PORT || 3000;

var RunEntry = nohm.model('runEntry', {
  properties: {
    date: {
      type: 'string',
    },
    distance: {
      type: 'double',
    },
    duration: {
      type: 'string',
    },
    notes: {
      type: 'string',
    }
  }
});

var listRunEntries = function (req, res) {
    RunEntry.find(function (err, ids) {
    var runEntries = [];
    var len = ids.length;
    var count = 0;
    console.log(ids, 'ids');
    if(ids.length === 0) {
      res.send([]);

    } else {
      ids.forEach(function (id) {
        var runEntry = new RunEntry();
        runEntry.load(id, function (err, props) {
          runEntries.push({id: this.id, 
                      date: props.date, 
                      distance: props.distance, 
                      duration: props.duration,
                      notes: props.notes});
          if (++count === len) {
            res.send(runEntries);
           
          }
        });
      });
    }
  });
}

var deleteAll = function (req, res) {
    RunEntry.find(function (err, ids) {
    var runEntries = [];
    var len = ids.length;
    var count = 0;
    if(ids.length === 0) {
      res.send([]);

    } else {
      ids.forEach(function (id) {
        var runEntry = new RunEntry();
        runEntry.load(id, function (err, props) {
          runEntry.remove();
          if (++count === len) {
            res.send(runEntries);
           
          }
        });
      });
    }
  });
}

var createRunEntry = function (req, res) {
  var runEntry = new RunEntry();
  runEntry.p(req.body);
  runEntry.save(function (err) {
    res.send(runEntry.allProperties(true));
  });
}

var getRunEntry = function (req, res) {
  RunEntry.load(req.params.id, function (err, properties) {
    if(err) {
      console.log("broke");
      res.send(404);
    } else {
      console.log("hey it worked");
      res.send(properties);
    }
  });
};

// var handleOptions = function (req, res) {
//   console.log("options request");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
//   res.send(200);

// }

app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header("Content-Type", "application/json");
  next();
});

app.get('/runs', listRunEntries);
app.get('/delete', deleteAll);
app.post('/runs', createRunEntry);
app.get('/runs/:id', getRunEntry);
//app.options('/runs', handleOptions);
//

app.listen(port);