const express = require('express');
const {body} = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET
router.get('/posts', isAuth, feedController.getPosts);

// POST
router.post('/posts', [
    body('title').trim().isLength({min: 7}),
    body('content').trim().isLength({min: 5})
], isAuth, feedController.createPost);

router.get('/post/:postId', isAuth, feedController.getPost);

router.put('/post/:postId', [
    body('title').trim().isLength({min: 7}),
        body('content').trim().isLength({min: 5})
], isAuth, feedController.updatePost);

router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;