const express = require('express');
const { StatusCodes } = require('http-status-codes');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js');

const { userById } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.profile });
});

router.param('userId', userById);

module.exports = router;
