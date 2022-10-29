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
      res.render('home', { deals });
    })
    .catch((error) => {
      next(error);
    });
});

// router.get('/private', routeGuard, (req, res, next) => {
//   res.render('private');
// });

module.exports = router;
