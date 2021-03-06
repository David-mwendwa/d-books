const { StatusCodes } = require('http-status-codes');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'Product not found' });
      }
      req.product = product;
      next();
    });
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

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.status(StatusCodes.OK).json(req.product);
};

/**
 *
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=created&order=desc&limit=4
 * if no params are sent, then all products are returned
 */
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : '6';

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: 'Products not found',
        });
      }
      res.status(StatusCodes.OK).json(data);
    });
};

/**
 * It will find products based on the request product category
 * other products that have the same category, will be returned
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : '6';
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: 'Products not found',
        });
      }
      res.status(StatusCodes.OK).json(products);
    });
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

/**
 * Get all the categories that are used in the product model - distinct to product
 */
exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Categories not found' });
    }
    res.status(StatusCodes.OK).json(categories);
  });
};

/**
 * List products by search
 */
exports.listBySearch = (req, res) => {
  let order = req.query.order ? req.query.order : 'desc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : '100';
  let skip = parseInt(req.body.skip);

  let findArgs = {};

  for (const key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filter[key];
      }
    }
  }

  Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: 'Products not found' });
      }
      res.status(StatusCodes.OK).json({ size: data.length, data });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res, next) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
    // assign category value to query.category
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties, search & category
    Product.find(query, (err, products) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: errorHandler(err) });
      }
      res.status(StatusCodes.OK).json(products);
    }).select('-photo'); // photo makes the request so slow
  }
};
