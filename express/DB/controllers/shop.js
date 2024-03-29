const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            console.log(product)
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then((products) =>
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            })
        )
        .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart = null;
    let quantity = 1;
    req.user.getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: prodId}})
        })
        .then(product => {
            if (product.length > 0) {
                quantity += product[0].cartItem.quantity;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {through: {quantity: quantity}})
        })
        .then(() => {
            res.redirect('/cart');
        })
}


exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        })

};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.deleteFromCart = (req, res) => {
    const productId = req.body.id;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            const product = products[0];
            return product.destroy();
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postOrder = (req, res, next) => {
    let selectedProducts;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            selectedProducts = products;
            return req.user.createOrder()
        })
        .then(order => {
            order.addProducts(selectedProducts.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity};
                return product;
            }))
        })
        .catch(err => {
            console.log(err);
        })
}
