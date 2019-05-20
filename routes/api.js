const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter).all(methodNotAllowed);

apiRouter.use('/articles', articlesRouter).all(methodNotAllowed);

apiRouter.use('/comments', commentsRouter).all(methodNotAllowed);

apiRouter.use('/users', usersRouter).all(methodNotAllowed);

module.exports = apiRouter;
