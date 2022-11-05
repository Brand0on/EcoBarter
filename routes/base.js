'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Deal = require('./../models/deal');
router.get('/', (req, res, next) => {
  res.render('initial');
});
router.get('/home', (req, res, next) => {
  Deal.find()
    //using the 'sort' method to organizet he words from the newest deal to the latest one.
    .sort({
      createdAt: -1
    })
    //we use the 'populate' method to access to all the properties of the object "author".
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
      //console.log(dealTotalInfo);
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
