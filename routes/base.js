'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Deal = require('./../models/deal');
const Follow = require('./../models/connect');
const { connect } = require('mongoose');

router.get('/', (req, res, next) => {
  let deals;
  Deal.find()
    .sort({
      createdAt: -1
    })
    .populate('author')
    .then((dealsInfo) => {
      deals = dealsInfo;
      return Connect.find({
        connector: req.user._id
      })
        .then((connects) => {
          const idsOfPeopleConnected = connects.map(
            (connect) => connect.connected
          );
          return Deal.find({ author: idsOfPeopleConnected });
        })
        .then((dealsOfPeopleConnected) => {
          const dealTotalInfo = deals.map((deal) => {
            (deal) => deal.getAddedInformation(req.user ? req.user._id : null);
          });

          const dealsOfPeopleConectedWidhtdealTotalInfo = deals.map((deal) => {
            (deal) => deal.getAddedInformation(req.user ? req.user._id : null);
          });

          res.render('home', { deal: dealTotalInfo });
        });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
