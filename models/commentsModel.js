const connection = require('../db/connection');

exports.changeVotesByCommentId = (comment_id, newVote) => {
  return connection('comments')
    .where('comment_id', '=', comment_id)
    .update(newVote)
    .returning('*');
};

exports.removeCommentById = comment_id => {
  return connection('comments')
    .where('comment_id', '=', comment_id)
    .del()
    .returning('*');
};
