const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favorites: {
        movies: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Movie',
                required: true
            }
        }]
    }
})

userSchema.methods.addToFavorites = function (id) {
    this.favorites.movies.push(id);

    this.save();
}


module.exports = mongoose.model('User', userSchema);