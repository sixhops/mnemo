var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Muse = require('../models/muse');

// GET /muses route - get all muses by user
router.get('/', function(req, res, next) {
  Muse.find({userId: 'something'}, function(err, muse) {
    res.send(muse);
  });
});

// POST /muses route - post new muse by user
router.post('/', function(req, res, next) {

});

// GET /muses/:id route - get muse by id
router.get('/:id', function(req, res, next) {

});

// PUT /muses/:id route - update muse by id
router.put('/:id', function(req, res, next) {

});

router.delete('/:id', function(req, res, next) {

});
