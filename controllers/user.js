const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ err: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(StatusCodes.CREATED).json({ user });
  });
};
