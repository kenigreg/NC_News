const {
  fetchArticles,
  fetchArticlesById,
  changeVotesByArticleId,
  fetchCommentsByArticleId,
  insertCommentsByArticleId
} = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic, p, limit } = req.query;

  fetchArticles(sort_by, order, author, topic, p, limit)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesById(article_id)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;

  changeVotesByArticleId(article_id, body)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  fetchCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const keys = { article_id, author: username, body };
  insertCommentsByArticleId(keys)
    .then(([comment]) => {
      if (Object.keys(req.body).length !== 2) {
        return Promise.reject({
          status: 400,
          msg: 'violates not null violation'
        });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};