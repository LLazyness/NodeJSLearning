const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie', moviesSchema);