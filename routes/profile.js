const express = require('express');
const User = require('../models/user');
const Deal = require('./../models/deal');
const connect = require('./../models/connect');
const profileRouter = express.Router();
const routeGuardMiddleware = require('./../middleware/route-guard');
const Connect = require('./../models/connect');

profileRouter.get('/edit', routeGuardMiddleware, (req, res, next) => {
  res.render('profile/edit', { profile: req.user });
});

profileRouter.post('/edit', routeGuardMiddleware, (req, res, next) => {
  const { name, email, username } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email, username })
    .then(() => {
      res.redirect(`/profile/${req.user._id}`);
    })
    .catch((error) => {
      nexr(error);
    });
});

profileRouter.post('/delete', routeGuardMiddleware, (req, res, next) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

profileRouter.get('/:id', (req, res, next) => {
  {
    const { id } = req.params;
    let user;
    let deals;
    User.findById(id)
      .then((userInfo) => {
        user = userInfo;
        return Deal.find({
          author: id
        })
          .sort({ createdAt: -1 })
          .populate('author');
      })
      .then((dealsInfo) => {
        deals = dealsInfo;
        if (req.user) {
          return Connect.findOne({
            connector: req.user._id,
            connected: id
          });
        } else {
          return null;
        }
      })
      .then((connect) => {
        const isOwnProfile = req.user ? String(req.user._id) === id : false;
        res.render('profile/detail', {
          profile: user,
          deals,
          connect,
          isOwnProfile
        });
      })
      .catch((error) => {
        next(error);
      });
  }
});

profileRouter.post('/:id/connect', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  Follow.create({
    connector: req.user._id,
    connected: id
  })
    .then(() => {
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => [next(error)]);
});

profileRouter.post(
  '/profile/:id/disconnect',
  routeGuardMiddleware,
  (req, res, next) => {
    const { id } = req.params;
    Follow.findOneAndDelete({
      connector: req.user._id,
      connected: id
    })
      .then(() => {
        res.redirect(`/profile/${id}`);
      })
      .catch((error) => [next(error)]);
  }
);

module.exports = profileRouter;
