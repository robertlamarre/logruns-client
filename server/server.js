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

var User = nohm.model('User', {
  properties: {
    firstname: {
      type: 'string',
    },
    lastname: {
      type: 'string',
    },
    age: {
      type: 'string',
    }
  }
});

var listUsers = function (req, res) {
    User.find(function (err, ids) {
    var users = [];
    var len = ids.length;
    var count = 0;
    console.log(ids, 'ids');
    if(ids.length === 0) {
      res.send([]);

    } else {
      ids.forEach(function (id) {
        var user = new User();
        user.load(id, function (err, props) {
          users.push({id: this.id, firstname: props.firstname, lastname: props.lastname, age: props.age});
          if (++count === len) {
            res.send(users);
          }
        });
      });
    }
  });
}

var userDetails = function (req, res) {
  User.load(req.params.id, function (err, properties) {
    if(err) {
      res.send(404);
    } else {
      res.send(properties);
    }
  });
};

var deleteUser = function (req, res) {
  var user = new User();
  user.id = req.params.id;
  user.remove(function (err) {
    res.send(204);
  });
}

var createUser = function (req, res) {
  var user = new User();
  user.p(req.body);
  user.save(function (err) {
    res.send(user.allProperties(true));
  });
}

var updateUser = function (req, res) {
  var user = new User();
  user.id = req.params.id;
  user.p(req.body);
  user.save(function (err) {
    res.send(user.allProperties(true));
  });
}

var handleOptions = function (req, res) {
  console.log("options request");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
  res.send(200);

}
app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header("Content-Type", "application/json");
  next();
});
app.get('/users', listUsers);
app.get('/users/:id', userDetails);
app.del('/users/:id', deleteUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.options('/users', handleOptions);
app.options('/users/:id', handleOptions);


app.listen(port);


/*



  var user = new User();
  user.p({
    firstname: 'Mark',
    lastname: 'Davis',
    age: 10
  });

  user.save(function (err) {
      console.log('saved user! :-)');
  });

*/
