const { StatusCodes } = require('http-status-codes');
const _ = require('lodash');
const Category = require('../models/category');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Category not found',
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errorHandler(err),
      });
    }
    res.status(StatusCodes.CREATED).json(data);
  });
};

exports.read = (req, res) => {
  return res.status(StatusCodes.OK).json(req.category);
};

exports.update = (req, res) => {
  let category = req.category;
  //category = req.body.name;
  category = _.extend(category, req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Category Updated',
      });
    }
    res.status(StatusCodes.OK).json(data);
  });
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errorHandler(err),
      });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: 'Category deleted', deletedCategory });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errorHandler(err),
      });
    }
    res.status(StatusCodes.OK).json(data);
  });
};
