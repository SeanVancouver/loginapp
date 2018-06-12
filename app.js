const createError = require('http-errors');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/loginappdb');

require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    // res.locals.user = req;
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

io.on('connection', (socket) => {
  console.log('New user connected');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
