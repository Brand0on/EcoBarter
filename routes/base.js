'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Deal = require('./../models/deal');

router.get('/', (req, res, next) => {
  Deal.find()
    .sort({
      createdAt: -1
    })
    .populate('author')
    .then((deals) => {
      const dealTotalInfo = deals.map((deal) => {
        const hasBeenUpdated =
          String(deal.CreatedAt) !== String(deal.updatedAt);
        const isOwn = req.user
          ? String(req.user._id) === String(deal.author)
          : false;
        return {
          ...deal.toJSON(),
          hasBeenUpdated,
          isOwn
        };
      });
      res.render('home', { dealTotalInfo });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
