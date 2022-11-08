const router = require('express').Router();

const homeController = require('./controllers/homeController');
const createController = require('./controllers/createController');
const authController = require('./controllers/authController');
const detailsController = require('./controllers/detailsController');

router.use('/movies', homeController);
router.use('/create', createController);
router.use('/auth', authController);
router.use('/details', detailsController);

module.exports = router;