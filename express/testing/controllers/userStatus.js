const User = require('../models/users');

exports.getStatus = (req, res, next) => {
    const userId = req.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error("failed to get user");
                error.statusCode = 500;
                throw error;
            }

            res.json({status: user.status});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateStatus = (req, res, next) => {
    const userId = req.userId;
    const status = req.params.status;
    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error("failed to get user");
                error.statusCode = 500;
                throw error;
            }

            user.status = status;
            return user.save();
        })
        .then(() => {
            res.status(201).json({message: 'OK'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}