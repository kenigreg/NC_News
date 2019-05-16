const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticlesById,
  updateVotesByArticleId,
  getCommentsByArticleId,
  postCommentsByArticleId
} = require('../controllers/articlesController');

articlesRouter.route('/').get(getArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(updateVotesByArticleId);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

module.exports = articlesRouter;
