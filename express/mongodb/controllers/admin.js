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
    const product = new Product(title, price, description, imageUrl, null, req.user._id);
    product
        .save()
        .then(() => {
            console.log('Created product');
            res.redirect('/add-product')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.delete = (req, res) => {
    const productId = req.params.productId;
    Product.remove(productId)
        .then(() => {
            console.log("DESTROYED PRODUCT");
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
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

exports.getEditProduct = (req, res, next) => {
    const editMode = Boolean(req.query.edit);
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;
    Product.findById(prodId)
        //Product.findByPk(prodId)
        .then(product => {
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
    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImage, prodId);
    product.save()
        .then(() => {
            console.log('UPDATED PRODUCT');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}