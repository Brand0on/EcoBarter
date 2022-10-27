'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true
  },
  passwordHashAndSalt: {
    type: String
  },
  image: String
});

const User = mongoose.model('User', schema);

module.exports = User;
