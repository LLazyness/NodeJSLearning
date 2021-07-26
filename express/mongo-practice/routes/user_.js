const express = require('express');

const userController = require('../controllers/user_');

const router = express.Router();

router.post('/user', userController.createUser);
router.get('/favorites', userController.getFavorites);
router.post('/favorites', userController.addToFavorites);

module.exports = router;