'use strict';

const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      trim: true
    },
    description: {
      type: String,

      trim: true
    },
    type: {
      type: String,

      enum: ['service', 'object']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;
