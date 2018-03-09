var mongoose = require('mongoose');

var museSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 80
  },
  summary: {
    type: String,
    minlength: 0,
    maxlength: 150
  },
  dateAdded: {
    type: Date,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true
  }
});
