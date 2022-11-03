const express = require('express');
const User = require('../models/user');
const Deal = require('./../models/deal');
const connect = require('./../models/connect');
const upload = require('./../upload');
const profileRouter = express.Router();
const routeGuardMiddleware = require('./../middleware/route-guard');
const Connect = require('./../models/connect');

profileRouter.get('/edit', routeGuardMiddleware, (req, res, next) => {
  res.render('profile/edit', { profile: req.user });
});

profileRouter.post(
  '/edit',
  routeGuardMiddleware,
  upload.single('image'),
  (req, res, next) => {
    const { name, email, username } = req.body;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    User.findByIdAndUpdate(req.user._id, { name, email, username, image })
      .then(() => {
        res.redirect(`/profile/${req.user._id}`);
      })
      .catch((error) => {
        nexr(error);
      });
  }
);

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
        const dealTotalInfo = deals.map((deal) => {
          const hasBeenUpdated =
            String(deal.CreatedAt) !== String(deal.updatedAt);
          const isOwn = req.user
            ? String(req.user._id) === String(deal.author)
            : false;
          return {
            //the .toJSON() method get a compatible JSON version of the deal document
            ...deal.toJSON(),
            hasBeenUpdated,
            isOwn
          };
        });

        res.render('profile/detail', {
          profile: user,
          deals: dealTotalInfo,
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
