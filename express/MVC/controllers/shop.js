const Product = require('../models/product');

exports.getProducts = (req, res) => {
    const render = (products) => {
        res.render('shop', {products: products, title: 'Shop', path: '/'});
    }

    const product = new Product();
    product.fetchAll(render);
};