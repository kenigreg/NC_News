const {
  changeVotesByCommentId,
  removeCommentById
} = require('../models/commentsModel');

exports.updateVotesByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { body } = req;

  changeVotesByCommentId(comment_id, body)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(204).send({ comment });
    })
    .catch(next);
};
