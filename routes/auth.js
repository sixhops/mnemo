require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  // check authentication
  var hashedPass = '';
  var passwordMatch = false;
  // look up user
  User.findOne({email: req.body.email}, function(err, user) {
    // get hashed password from document
    hashedPass = user.password;
    // compare passwords
    passwordMatch = bcrypt.compareSync(req.body.password, hashedPass);
    if (passwordMatch) {
      // Make a token and return it as JSON
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      // TODO: Set the headers to set a cookie on the client
      var cookieObject = {email: user.email, token: token}
      res.cookie('email', user.email, {
        expires: new Date(Date.now() + 3600000) // 1 hour from now
      }).cookie('token', token, {
        expires: new Date(Date.now() + 3600000) // 1 hour from now 
      }).json({user: user, token: token});
    } else {
      // Return an error
      res.status(401).json({
        error: true,
        message: 'Username or Password is Wrong'
      });
    }
  })
});

/* POST /auth/signup route */
router.post('/signup', function(req, res, next) {
  // Find by email
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      res.redirect('/auth/signup');
    } else {
      // create and save a user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }, function(err, user) {
        if (err) {
          res.send(err.message)
        } else {
          // make a token & send it as JSON
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });
          // TODO: Set the headers to set a cookie on the client
          res.json({user: user, token: token});
        }
      });
    }
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({message: 'Must pass token'});
  }

  // get current user from token
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) throw err;
    //return user using the id from w/in JWTToken
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err) throw err;
      //Note: you can renew token by creating new token(i.e.
      //refresh it)w/ new expiration time at this point, but I’m
      //passing the old token back.
      // var token = utils.generateToken(user);
      // TODO: Set the headers to set a cookie on the client
      res.json({
        user: user,
        token: token
      });
    });
  });
});

module.exports = router;
