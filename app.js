var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var usersRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//处理session
app.use(session(
  {
    secret: 'DoDo_123!',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24*60*60*1000
    }
  }
))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('./api/user', usersRouter);

//seesion测试
app.get('/session-test', (req, res, next) => {
  // console.log(req.session);
  // const session = req.session;
  if (req.session.viewCount == null){
    req.session.viewCount = 0;
  }
  req.session.viewCount ++;
  res.json({viewCount: req.session.viewCount});
})

//登录测试
app.use('./login-test', (req, res, next) => {
  if (req.session.userName){
    res.json({
      erroNumber: 0,
      user: req.session.userName
    })
  }else{
    res.json({
      errorNumber: -1
    })
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
