var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

router.get('/profile', function(req, res, next) {
  res.send('You are logged in and this is your profile.');
});

module.exports = router;
