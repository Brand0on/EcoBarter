'user strict';

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary
  })
});

module.exports = upload;
