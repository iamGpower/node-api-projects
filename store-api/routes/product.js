const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controller/product');

router.route('/').get(getAllProducts);

module.exports = router;
