var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login page' });
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  console.log("Check authentication: " + req.isAuthenticated());
  res.render('profile');
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
