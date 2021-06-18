const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
        .then(() => {
            console.log('Created product');
            res.redirect('/products')
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit);
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
    //Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            res.render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: editMode,
                product: product
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImage;
            product.description = updatedDescription;
            return product.save();
        })
        .then(() => {
            console.log('UPDATED PRODUCT');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.delete = (req, res) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(() => {
            console.log("DESTROYED PRODUCT");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}
