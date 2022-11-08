const User = require('../models/User');

exports.getUserUnleaned = async (userId) => {
    return await User.findById(userId);
}

exports.getUserPopulated = async (userId) => {
    return await User.findById(userId).populate('myMovies').populate('savedMovies');
}