const usersRouter = require('express').Router();
const { getUserName, getUsers } = require('../controllers/usersController');

usersRouter.route('/:username').get(getUserName);

usersRouter.route('/').get(getUsers);

module.exports = usersRouter;
