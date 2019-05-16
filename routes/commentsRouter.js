const commentsRouter = require('express').Router();
const { updateVotesByCommentId } = require('../controllers/commentsController');

commentsRouter
  .route('/:comment_id')
  .patch(updateVotesByCommentId)
  .delete(deleteCommentByCommentId);

module.exports = commentsRouter;
