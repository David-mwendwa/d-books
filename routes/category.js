const express = require('express');
const router = express.Router();

const {
  create,
  categoryById,
  list,
  read,
  update,
  remove,
} = require('../controllers/category.js');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js');
const { userById } = require('../controllers/user');

router.get('/categories', list);
router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.param('userId', userById);
router.param('categoryId', categoryById);

module.exports = router;
