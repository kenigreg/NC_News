const usersRouter = require('express').Router();
const {
  getUserName,
  getUsers,
  postUsers
} = require('../controllers/usersController');

usersRouter.route('/:username').get(getUserName);

usersRouter
  .route('/')
  .get(getUsers)
  .post(postUsers);

module.exports = usersRouter;
