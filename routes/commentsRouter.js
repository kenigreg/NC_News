const commentsRouter = require('express').Router();
const {
  updateVotesByCommentId,
  deleteCommentByCommentId
} = require('../controllers/commentsController');

commentsRouter
  .route('/:comment_id')
  .patch(updateVotesByCommentId)
  .delete(deleteCommentByCommentId);

module.exports = commentsRouter;
