var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel');

router.post('/signup', passport.authenticate('local.signup', {
    session: false,
    failureRedirect: '/'
}), function (req, res, next) {
      console.log('success redirect!');
      res.redirect('../../');
});


router.post('/login', passport.authenticate('local.signin', {
    failureRedirect: '/user/',
}), function (req, res, next) {
      res.redirect('/profile');
});

module.exports = router;
