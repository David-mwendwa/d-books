const User = require('../models/user');

// looks for userId route param, if true,
// the method runs and makes the user available as 'profile' in the request object
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};
