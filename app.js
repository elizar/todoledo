
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/tasks', function(req, res)  {
  res.statusCode = 200;
  res.end('Conflict MotherFockkerr!');
});
app.get('/users', function(req, res)  {
  res.writeHead(200, {'content-type': 'application/json'});
  var users = {};
  users.status = 200;
  users.data = [{name:'tibur'}, {name:'timoy'}];
  res.end(JSON.stringify(users));
});
app.get('/items', function(req, res)  {
  res.writeHead(200, {'content-type': 'application/json'});
  var items = {};
  items.status = 200;
  items.data = [{type:'kitchen ware', name:'knife', id:1}, {type:'kitchen ware', name:'spoon', id:2}];
  res.end(JSON.stringify(items));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
