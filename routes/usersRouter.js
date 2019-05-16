const usersRouter = require('express').Router();
const { getUserName } = require('../controllers/usersController');

usersRouter.route('/:username').get(getUserName);

module.exports = usersRouter;
