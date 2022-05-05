const { StatusCodes } = require('http-status-codes');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.status(StatusCodes.OK).json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Image could not be uploaded' });
    }
    const { name, description, category, quantity, shipping } = fields;
    if (!name || !description || !category || !quantity || !shipping) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'All fields are required' });
    }
    const product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Image should be less than 1mb in size' });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: errorHandler(err) });
      }
      res.status(StatusCodes.CREATED).json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: errorHandler(err) });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'Product delete successfully', deletedProduct });
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.status(StatusCodes.OK).json(req.product);
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Image could not be uploaded' });
    }

    // update
    let product = req.product;
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Image should be less than 1mb in size' });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: errorHandler(err) });
      }
      res.status(StatusCodes.CREATED).json(result);
    });
  });
};
