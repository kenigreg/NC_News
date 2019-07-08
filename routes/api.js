const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');
const endpoints = require('../endpoints.json');

const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send(endpoints))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter).all(methodNotAllowed);

apiRouter.use('/articles', articlesRouter).all(methodNotAllowed);

apiRouter.use('/comments', commentsRouter).all(methodNotAllowed);

apiRouter.use('/users', usersRouter).all(methodNotAllowed);

module.exports = apiRouter;
