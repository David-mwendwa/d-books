const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
    res.status(StatusCodes.CREATED).json({ user });
  });
};
