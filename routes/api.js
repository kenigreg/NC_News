const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('./commentsRouter');
const usersRouter = require('./usersRouter');

const { methodNotAllowed } = require('../errors');

apiRouter.use('/topics', topicsRouter);
// .route('/topics')
// .get((req, res) => res.send({ ok: true }))
//.all(methodNotAllowed);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
