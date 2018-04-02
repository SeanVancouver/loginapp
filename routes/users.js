var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  console.log(req.body);

  // db.collection('Users').insertOne({
  //   username: 'Andrew',
  //   email: 'Andrew@gmail.com',
  //   password: 'samplepw'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops);
  // });

  res.send('respond with a resource');
});

module.exports = router;
