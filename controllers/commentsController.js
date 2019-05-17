const {
  changeVotesByCommentId,
  removeCommentById
} = require('../models/commentsModel');

exports.updateVotesByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { body } = req;

  changeVotesByCommentId(comment_id, body)
    .then(([comment]) => {
      res.send({ comment });
    })
    .catch(next);
};

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(comment => res.status(204).send({ comment }))
    .catch(next);
};
