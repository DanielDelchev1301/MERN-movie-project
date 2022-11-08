const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']

    },
    password: {
        type: String,
        required: [true, 'Password is required']

    },
    myMovies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    savedMovies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;