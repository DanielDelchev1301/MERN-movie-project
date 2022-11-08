const Movie = require('../models/Movie');

exports.getAllMovies = async () => {
    return await Movie.find();
}

exports.getOneMovie = async (movieId) => {
    return await Movie.findById(movieId).populate('owner').populate('usersSaved').lean();
}

exports.getMovieUnleaned = async (movieId) => {
    return await Movie.findById(movieId);
}

exports.createMovie = async (movieData) => {
    return await Movie.create(movieData);
}

exports.mostWatched = (allMovies) => {
    return allMovies.sort((a, b) => a.usersSaved.length - b.usersSaved.length).slice(-4);
}

exports.getAllSearchedMovies = (allMovies, searchedData) => {
    return allMovies.filter(x => x.title.toLowerCase() == searchedData.search.toLowerCase());
}

exports.updateMovie = async (movieData, movieId) => {
    return await Movie.findByIdAndUpdate(movieId, movieData);
}

exports.deleteMovie = async (movieId) => {
    return await Movie.findByIdAndDelete(movieId);
}