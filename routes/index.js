var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login page' });
});

router.get('/profile', isLoggedIn, function(req, res, next) {
            let user = req.user;
            let username = user.username;
            res.render('profile', { username: username });
        });

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Register page' });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
