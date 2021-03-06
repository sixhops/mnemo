require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongoose stuff
var mongoose = require('mongoose');

// console.log(process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
mongoose.connect('mongodb://localhost/mnemo', {useMongoClient: true});

// var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'client', 'build')));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  // res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// catch 404 and forward to error handler - commented out
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
