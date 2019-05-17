const {
  fetchArticles,
  fetchArticlesById,
  changeVotesByArticleId,
  fetchCommentsByArticleId,
  insertCommentsByArticleId
} = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesById(article_id)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: 'Article_Id Not Found' });
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
    .then(comments => res.status(200).send({ comments }))
    .catch(next);
};

exports.postCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const keys = { article_id, author: username, body };
  insertCommentsByArticleId(keys)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
