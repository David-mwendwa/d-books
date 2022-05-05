const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category.js');

router.post('/category/create', create);

module.exports = router;
