'use strict';

const mongoose = require('mongoose');

const connectSchema = new mongoose.Schema(
  {
    connecter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    connectee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Connect = mongoose.model('Connect', connectSchema);
module.exports = Connect;
