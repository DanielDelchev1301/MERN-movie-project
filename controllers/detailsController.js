const { getOneMovie, updateMovie, getMovieUnleaned, deleteMovie } = require('../services/movieService');
const { getUserUnleaned } = require('../services/userService');

const router = require('express').Router();

router.post('/movie', async (req, res) => {
    const movieId = Object.entries(req.body)[0][0];

    try {
        const movie = await getOneMovie(movieId);

        res.json(movie);
    } catch (error) {
        console.log(error);
    }
});

router.post('/movie/edit', async (req, res) => {
    const movieId = req.body.movieId;
    const movieData = req.body.movieData;

    try {
        const updatedMovie = await updateMovie(movieData, movieId);
        
        res.json(updatedMovie);
    } catch (error) {
        console.log(error);
    }
});

router.post('/movie/save', async (req, res) => {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    try {
        const user = await getUserUnleaned(userId);
        const movie = await getMovieUnleaned(movieId);

        user.savedMovies.push(movieId);
        movie.usersSaved.push(userId);

        user.save();
        movie.save();

        res.json({user, movie});
    } catch (error) {
        console.log(error);
    }
});

router.post('/movie/unsave', async (req, res) => {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    try {
        const user = await getUserUnleaned(userId);
        const movie = await getMovieUnleaned(movieId);

        const indexUser = user.savedMovies.indexOf(movieId);
        user.savedMovies.splice(indexUser, 1);
        const indexMovie = movie.usersSaved.indexOf(userId);
        movie.usersSaved.splice(indexMovie, 1);

        user.save();
        movie.save();

        res.json({user, movie});
    } catch (error) {
        console.log(error);
    }
});

router.post('/movie/delete', async (req, res) => {
    const movieId = Object.entries(req.body)[0][0];
    
    try {
        await deleteMovie(movieId);

        res.status(200).json('Movie deleted');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;