var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

router.get('/:id/chat', function(req, res, next) {
  let user = req.user;

  // console.log('CCCCCCChat reached ' + JSON.stringify(user.toString()));

  res.render('chat', { username: user.username, description: user.id });

});





module.exports = router;
