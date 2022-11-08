const router = require('express').Router();

const { createMovie } = require('../services/movieService');
const { getUserUnleaned } = require('../services/userService');

router.post('/', async (req, res) => {
    let movieData = req.body.movieData;
    movieData.owner = req.body.userId;
    
    try {
        const newMovie = await createMovie(movieData);
        const user = await getUserUnleaned(req.body.userId);

        user.myMovies.push(newMovie._id);
        user.save();

        res.json(newMovie);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;