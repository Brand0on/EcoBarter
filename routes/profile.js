const express = require('express');
const User = require('../models/user');
const Deal = require('./../models/deal');
const profileRouter = express.Router();
const routeGuardMiddleware = require('./../middleware/route-guard');

profileRouter.get('/edit', routeGuardMiddleware, (req, res, next) => {});

profileRouter.post('/edit', routeGuardMiddleware, (req, res, next) => {});

profileRouter.post('/delete', routeGuardMiddleware, (req, res, next) => {});

profileRouter.get('/:id', (req, res, next) => {
  {
    const { id } = req.params;
    let user;
    User.findById(id)
      .then((userInfo) => {
        user = userInfo;
        return Deal.find({
          author: id
        }).sort({ createdAt: -1 });
      })
      .then((deals) => {
        res.render('profile/detail', { profile: user, deals });
      })
      .catch((error) => {
        next(error);
      });
  }
});

profileRouter.post('/:id/follow', routeGuardMiddleware, (req, res, next) => {});

profileRouter.post(
  '/profile/:id/unfollow',
  routeGuardMiddleware,
  (req, res, next) => {}
);

module.exports = profileRouter;
