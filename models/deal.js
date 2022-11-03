'use strict';

const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {
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
      minlength: 5,
      maxlength: 300,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['service', 'object']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    image: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

dealSchema.methods.getAddedInformation = function (userId) {
  const deal = this;
  const hasBeenUpdated = String(deal.CreatedAt) !== String(deal.updatedAt);
  const isOwn = userId ? String(userId) === String(deal.author) : false;
  return {
    ...deal.toJSON(),
    hasBeenUpdated,
    isOwn
  };
};

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;
