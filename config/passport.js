var passport = require('passport');
var User = require('../models/userModel');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
      emailField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  }, function (req, email, password, done) {
      // console.log(req.body);
      User.findOne({'email': email}, function (err, user) {
          let reqbody = req.body;
          if (err) {
            console.log('user already exist');
            return done(err);
          }
          if (user) {
              return done(user);
          }
          var newUser = new User();
          newUser.email = reqbody.email;
          newUser.username = reqbody.username;
          newUser.password = password;
          newUser.save(function(err, result) {
             if (err) {
                 console.log('register failed');
                 return done(err);
             }
             console.log('user saved!');
             return done(null, newUser);
          });
      });
  }
));

passport.use('local.signin', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
  }, function(req, email, password, done) {
      User.findOne({'email': email}, function (err, user) {
          if (err) {
              return done(err);
          }
          if (!user) {
              console.log('no user found...');
              return done(err);
          }
          if (user.password!==password) {
              console.log('wrong pw...');
              return done(err);
          }
          console.log(user);
          return done(null, user);
      });
  })
);
