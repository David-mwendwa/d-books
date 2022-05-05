const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); // to generate signed token
const { expressjwt } = require('express-jwt'); // for auth check
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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    // persit the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 1 * 24 * 60 * 60 * 1000 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.status(StatusCodes.OK).json({ message: 'Signout success' });
};

// makes sure / checks if token is available in the request
exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

// confirms if the user is who they claim they are
exports.isAuth = (req, res, next) => {
  // console.log({ profile: req.profile, auth: req.auth });
  let user =
    req.profile && req.auth && String(req.profile._id) === req.auth._id;
  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).json({ error: 'Access denied' });
  }
  next();
};

// check if the user is admin. If true, allows access to a route
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'Admin resourse! Access denied' });
  }
  next();
};
