const { getAllMovies, mostWatched, getAllSearchedMovies } = require('../services/movieService');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        const allMovies = await getAllMovies();

        res.json(allMovies);
    } catch (error) {
        console.log(error);
    }
});

router.get('/most-watched', async (req, res) => {

    try {
        const allMovies = await getAllMovies();
        const mostWatchedMovies = await mostWatched(allMovies);

        res.json(mostWatchedMovies);
    } catch (error) {
        console.log(error);
    }
});

router.post('/search', async (req, res) => {
    const searchedData = req.body;

    try {
        const allMovies = await getAllMovies();
        const searchedMovies = await getAllSearchedMovies(allMovies, searchedData);

        res.json(searchedMovies);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;