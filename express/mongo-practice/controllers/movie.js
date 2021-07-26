const Movie = require('../models/movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (e) {
        console.log(e);
    }
};

exports.addMovie = async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        rating: req.body.rating,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    });

    try {
        await movie.save();
        res.redirect('/movies');
    } catch (e) {
        console.log(e);
    }
}

exports.updateMovie = async (req, res) => {
    try {
        let movie = await Movie.findById(req.body.id);

        movie.title = req.body.title;
        movie.rating = req.body.rating;
        movie.description = req.body.description;
        movie.imageUrl = req.body.imageUrl;

        await movie.save();

        res.redirect('/movies');
    } catch (e) {
        console.log(e);
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.deleteOne({_id: req.body.id});
        res.redirect('/movies');
    } catch (e) {
        console.log(e);
    }
}
