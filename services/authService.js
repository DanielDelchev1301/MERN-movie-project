const User = require('../models/User');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS, SECRET } = require('../configuration/environment');
const { jwtSign } = require('../utils/jwt');

exports.register = async ({email, username, password}) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const isUser = await User.findOne({ email });

    if (isUser) {
        throw { message: 'Invalid email' }
    }

    return User.create({
        email,
        username,
        password: hashedPassword
    });
}

exports.login = async ({email, password}) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw { message: 'Wrong email or password'}
    }

    const encodedPassword = user.password;
    const isCorrect = await bcrypt.compare(password, encodedPassword);

    if (!isCorrect) {
        throw { message: 'Wrong email or password'}
    }

    return user;
}

exports.createToken = async (user) => {
    const payload = { _id: user._id, email: user.email };
    const options = { expiresIn: '7d' };

    const token = await jwtSign(payload, SECRET, options);
    return token;
}