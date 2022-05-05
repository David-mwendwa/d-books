const { StatusCodes } = require('http-status-codes');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Image could not be uploaded' });
    }
    const product = new Product(fields);
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: errorHandler(err) });
      }
      res.status(StatusCodes.CREATED).json(result);
    });
  });
};
