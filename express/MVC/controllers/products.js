const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('add-product', {title: "shop", path: 'path'});
};

exports.addProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};