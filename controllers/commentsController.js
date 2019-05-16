const { changeVotesByCommentId } = require('../models/commentsModel');

exports.updateVotesByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const { body } = req;

  changeVotesByCommentId(comment_id, body)
    .then(([comment]) => res.status(200).send({ comment }))
    .catch(next);
};
