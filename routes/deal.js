'use strict';

const express = require('express');
const dealRouter = express.Router();
const Deal = require('./../models/deal');
const routeGuardMiddleware = require('./../middleware/route-guard');
const upload = require('./../upload');

//POST '/create'
dealRouter.post(
  '/create',
  routeGuardMiddleware,
  upload.single('image'),
  (req, res, next) => {
    console.log('HERE');
    const { description, title, type } = req.body;

    const author = req.user._id;
    let image;
    if (req.file) {
      image = req.file.path;
    }
    console.log(image);

    Deal.create({
      title,
      description,
      type,
      author,
      image
    })

      .then((deal) => {
        console.log(deal);
        res.redirect('/home');
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
);

//GET '/:id/edit'
dealRouter.get(
  '/:id/edit',
  routeGuardMiddleware,
  upload.single('image'),
  (req, res, next) => {
    const { id } = req.params;
    Deal.findById(id)
      .then((deal) => {
        res.render('deals/edit', { deal });
      })
      .catch((error) => [next(error)]);
  }
);
dealRouter.get('/create', (req, res, next) => {
  res.render('deals/create');
});

//POST '/:id/edit'
dealRouter.post(
  '/:id/edit',
  routeGuardMiddleware,
  upload.single('image'),
  (req, res, next) => {
    const { id } = req.params;
    const { description, title } = req.body;

    let image;
    if (req.file) {
      image = req.file.path;
    }

    Deal.findByIdAndUpdate(id, {
      description,
      title,
      image
    })
      .then((deal) => {
        console.log(deal.description);
        res.redirect('/home');
      })
      .catch((error) => {
        next(error);
      });
  }
);

//POST '/:id/delete'
dealRouter.post('/:id/delete', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  Deal.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/home');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = dealRouter;
