const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    usersSaved: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;