const User = require('../models/users');
const Movie = require('../models/movie');

exports.createUser = async (req, res) => {
    const user = new User({
        name: "test",
        email: "email",
        favorites: {
            movies: []
        }
    })

    try {
        await user.save();
    } catch (e) {
        res.error(e);
    }

    res.json(user);
}

exports.addToFavorites = async (req, res) => {
    try {
        const user = await User.findById("60d48b7572f3c0805c75b6b7");
        const findFavorites = user.favorites.movies.find(favorites => {
            return favorites.id.toString() === req.body.id;
        });

        if (findFavorites) {
            return res.redirect('/movies');
        }

        user.favorites.movies.push({id: req.body.id});
        await user.save();

        res.redirect('/movies');
    } catch (e) {
        console.log(e);
    }
}

exports.getFavorites = async (req, res) => {
    try {
        User.findById("60d48b7572f3c0805c75b6b7")
            .populate('favorites.movies.id')
            .then(user => {
                return res.send(user.favorites.movies);
            })
    } catch(e) {
        console.log(e);
    }
}