'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 27,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 300,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum:[service, object]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  
  image: [String],
  timestamps: true,
});

const Deal = mongoose.model('Deal', schema);
