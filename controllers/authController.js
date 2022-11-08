const { register, createToken, login } = require('../services/authService');
const { getUserPopulated } = require('../services/userService');

const router = require('express').Router();

router.post('/register', async (req, res) => {

    try {
        const createdUser = await register(req.body);
        const token = await createToken(createdUser);

        res.json({createdUser, token});
    } catch (error) {
        res.status(301).json(error.message);
    }
});

router.post('/login', async (req, res) => {

    try {
        const user = await login(req.body);
        const token = await createToken(user);

        res.json({user, token});
    } catch (error) {
        res.status(301).json(error.message);
    }
});

router.post('/get-user', async (req, res) => {
    const userId = Object.entries(req.body)[0][0];

    try {
        const user = await getUserPopulated(userId);

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;