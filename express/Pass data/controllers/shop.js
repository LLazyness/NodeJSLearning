const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    const cart = new Cart();
    cart.getCart(cartProducts => {
        Product.fetchAll(products => {
            const filteredProducts = [];
            for (let product of products) {
                const cartProductData = cartProducts.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    filteredProducts.push({productData: product, qty: cartProductData.qty});
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: filteredProducts
            })
        })
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        const cart = new Cart();
        cart.addProduct(prodId, product.price);
    })

    res.redirect('/');
}


exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.deleteFromCart = (req, res) => {
    const productId = req.body.id;
    const price = req.body.price;
    const cart = new Cart();
    cart.deleteProduct(productId, price);
    res.redirect('/cart');
}
