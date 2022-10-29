'use strict';

const express = require('express');
const dealRouter = express.Router();
const Deal = require('./../models/deal');
const routeGuardMiddleware = require('./../middleware/route-guard');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

//POST '/deal/create'
dealRouter.post('/deal/create', routeGuardMiddleware, (req, res, next) => {
  const { description } = req.body;
  const author = req.user._id;
  let image;
  if (req.file) {
    picture = req.file.path;
    Deal.create({
      title,
      description,
      type,
      author,
      image
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => {
        next(error);
      });
  }
});

//GET '/deal/:id/edit'
dealRouter.get('/deal/:id/edit', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  Deal.findById(id)
    .then((deal) => {
      res.render('deals/edit', { deal });
    })
    .catch((error) => [next(error)]);
});

//POST '/deal/:id/edit'
dealRouter.post('/deal/:id/edit', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;
  let path;
  if (req.file) {
    picture = req.file.path;
  }

  Deal.findByIdAndUpdate(id, {
    title,
    description,
    type,
    image
  })
    .then((deal) => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

//POST '/deal/:id/delete'
dealRouter.post('/deal/:id/delete', routeGuardMiddleware, (req, res, next) => {
  const { id } = req.params;
  Deal.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = dealRouter;
