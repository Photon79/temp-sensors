var express = require('express')
  , routes = require('./routes')
  , db = require('mysql')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app, {'flash_policy_port': -1})
  , connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'temp_sensors',
  });

connection.connect();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  io.configure('development', function() {
    io.set('transports', ['flashsocket', 'websocket', 'xhr-polling']);
    io.set('log level', 3);
    io.enable('log');
  });
});

app.configure('production', function(){
  app.use(express.errorHandler());
  io.configure(function() {
    io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
  });
});

// Routes

app.get('/', routes.index);

io.of('/sensor1').on('connection', function(socket) {
  getData(socket, 1);
  setInterval(function() { getData(socket, 1); }, 3000);
  socket.on('update', function(data) {
    connection.query('update sensors set `' + data.name + '` = "' + data.value + '" where id = 1', function(err) {
      if (!err) {
        socket.emit('success');
      }
      else {
        socket.emit('error');
      }
    });
  });
});

io.of('/sensor2').on('connection', function(socket) {
  getData(socket, 2);
  setInterval(function() { getData(socket, 2); }, 3000);
  socket.on('update', function(data) {
    connection.query('update sensors set `' + data.name + '` = "' + data.value + '" where id = 2', function(err) {
      if (!err) {
        socket.emit('success');
      }
      else {
        socket.emit('error');
      }
    });
  });
});

io.of('/sensor3').on('connection', function(socket) {
  getData(socket, 3);
  setInterval(function() { getData(socket, 3); }, 3000);
});
function getData(socket, id) {
  connection.query('select * from sensors where id = ' + id, function(err, rows) {
    if (!err) {
	   socket.emit('data', {data: rows});
    }
  });
}

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
