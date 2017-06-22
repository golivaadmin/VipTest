var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* GLOBAL VARS */
global.secret_diggest = "61b94161-c9c7-475f-b7f2-62fa58fef871";
global.incial_path = __dirname;
global.url_server = "http://localhost:3000/";
global.url_server_image = "http://localhost:3000/img/";
/* ROUTES */
var routes = require('./routes/index');

var user_routes = require('./routes/go_panel/userRoute');

var test_routes = require('./routes/custom/testRoute');

var marca_routes = require('./routes/custom/marcaRoute');

var mensajes_routes = require('./routes/custom/mensajeRoute');

var pedidos_routes = require('./routes/custom/pedidoRoute');

mongoose.connect('mongodb://localhost/viptest', function(err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }else{
    console.log("Mongo OK");
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ROUTES */
app.use('/ws/custom/test', test_routes);
app.use('/ws/custom/marca', marca_routes);
app.use('/ws/custom/mensaje', mensajes_routes);
app.use('/ws/custom/pedido', pedidos_routes);
app.use('/ws/gopanel/user', user_routes);



/* //ROUTES */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
