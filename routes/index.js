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

router.get('/userlist', function (req, res, next) {
    User.find(function (err, docs) {
        var userChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            userChunks.push(docs.slice(i, i + chunkSize));
        }
        // console.log(userChunks + " testtesttest ");

        let vvvv = "testetestestse";
        res.render('userlist', {title: 'Shopping Cart', users: userChunks});

    });
});

router.get('/profile/:id', isLoggedIn, function(req, res, next) {

    var profileId = req.params.id;

    User.findById(profileId, function(err, profile) {
       if (err) {
           console.log(err);
       }
        let username = profile.username;
        res.render('profile', { username: username });
    });
});

router.get('/edit', isLoggedIn, function (req, res, next) {
    let profile = req.app.locals.user;
    res.render('editprofile', {title: 'Edit profile', username: profile.username });
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
