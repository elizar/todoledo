
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
  res.writeHead(200, {'content-type': 'application/json'});
  var tasks = {};
  tasks.status = 200;
  tasks.data = [{title:'get some milk'}, {title:'eat some food'}];
  res.end(JSON.stringify(tasks));
});
app.get('/users', function(req, res)  {
  res.writeHead(200, {'content-type': 'application/json'});
  var users = {};
  users.status = 200;
  users.data = [{name:'tibur'}, {name:'timoy'}];
  res.end(JSON.stringify(users));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
