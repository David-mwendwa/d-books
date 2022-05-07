const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  list,
  listRelated,
  listCategories,
  update,
  remove,
} = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.js');
const { userById } = require('../controllers/user');

router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
