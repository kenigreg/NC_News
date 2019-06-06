const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticlesById,
  updateVotesByArticleId,
  getCommentsByArticleId,
  postCommentsByArticleId,
  postArticle
} = require('../controllers/articlesController');

articlesRouter
  .route('/')
  .get(getArticles)
  .post(postArticle);

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(updateVotesByArticleId);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

module.exports = articlesRouter;
