'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Deal = require('./../models/deal');
const Connect = require('./../models/connect');
//const { connect } = require('mongoose');

router.get('/', (req, res, next) => {
  const user = req.user && req.user._id;
  const query = user ? { connector: user } : null;
  let deals;
  Deal.find()
    .sort({
      createdAt: -1
    })
    .populate('author')
    .then((dealsInfo) => {
      deals = dealsInfo;
      return Connect.find(query)
        .then((connects) => {
          const idsOfPeopleConnected = connects.map(
            (connect) => connect.connected
          );
          return Deal.find({ author: idsOfPeopleConnected })
            .sort({
              createdAt: -1
            })
            .populate('author');
        })
        .then((dealsOfPeopleConnected) => {
          const dealTotalInfo = deals.map((deal) =>
            deal.getAddedInformation(req.user ? req.user._id : null)
          );

          const dealsFromConectedWidhtdealTotalInfo = deals.map((deal) => {
            (deal) => deal.getAddedInformation(req.user ? req.user._id : null);
          });

          res.render('home', {
            deals: dealTotalInfo,
            dealsFromConnected: dealsFromConectedWidhtdealTotalInfo
          });
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
