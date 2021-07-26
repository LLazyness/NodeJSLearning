const express = require('express');

const shopController = require('../controllers/movie');

const router = express.Router();

//router.get('/', shopController.getIndex);

router.get('/movies', shopController.getMovies);

router.post('/movie', shopController.addMovie);

router.delete('/movie', shopController.deleteMovie);

router.put('/movie', shopController.updateMovie);

//router.get('/products/:productId', shopController.getProduct);

//router.get('/cart', shopController.getCart);

//router.post('/cart', shopController.postCart);

//router.post('/cart-delete-item', shopController.deleteFromCart);

//router.get('/orders', shopController.getOrders);



//router.post('/create-order', shopController.postOrder)

module.exports = router;
