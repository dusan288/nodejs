var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var User = require('./models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var index = require('./routes/index');
var blog = require('./routes/blog');
var auth = require('./routes/auth');

var uri = 'mongodb://localhost/blog_db';

mongoose.connect(uri, {
  useMongoClient: true,
});

var app = express();
app.use(session({
  secret: 'r4ndom s3cre1t',
  resave: false,
  saveUninitialized: false
}));
//Configure passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//expose users to all views
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
//routes
app.use('/', index);
app.use('/blog', blog);
app.use('/auth', auth);

//Login routes
app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login', tryLogin, (req, res) => {
  res.redirect('/blog');
});

//attempt login, return error message if present
function tryLogin(req, res, next) {
   passport.authenticate('local', function(err, user, loginErr ){

     if(!user){
       console.log("Authentication failed");
      return res.render("login", {message: "Wrong credentials!"});
     }
    if(loginErr) {
      console.log(loginErr.message);
      res.send(loginErr.message);
    }
     req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return next();
    });      
  })(req, res, next);
}

//Auth routes 
app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({username: username});
  User.register(newUser, password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate('local')(req, res, function(){
        res.redirect('/blog');
      });
    }
  })

});

app.get('/logout', function(req, res) {
  req.logOut();
  res.redirect('/blog');
})

app.get('/hello', function(req, res, next) {
  res.send('Hello World!');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
