const express = require('express');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {products: products, title: 'Shop', path: '/'});
});

module.exports = router;
