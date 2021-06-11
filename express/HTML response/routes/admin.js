const express = require('express');
const path = require('path');

const rootDir = require('../../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
    products.push({title: req.body.title});
    res.redirect("/");
});

module.exports = {router, products};