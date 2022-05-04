const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for auth check
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

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'User with that email does not exist. Please signup' });
    }

    // if user is found, make sure email & password match
    // authenticate method created in user model
    if (!user.authenticate(password)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Email and password don't match" });
    }

    // generate a signed token with userId and token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persit the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.status(StatusCodes.OK).json({ message: 'Signout success' });
};
