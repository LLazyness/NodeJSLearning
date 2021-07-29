const express = require('express');
const {body} = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
const userStatusController = require('../controllers/userStatus');

const router = express.Router();

router.get('/status', isAuth, userStatusController.getStatus);

router.put('/status/:status', isAuth, userStatusController.updateStatus);

module.exports = router;