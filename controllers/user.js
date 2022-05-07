const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');

// looks for userId route param, if true,
// the method runs and makes the user available as 'profile' in the request object
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.status(StatusCodes.OK).json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ error: 'You are not authorized to perform this action' });
      }
      user.hashed_password = undefined;
      user.salt = undefined;

      return res.status(StatusCodes.OK).json(user);
    }
  );
};
