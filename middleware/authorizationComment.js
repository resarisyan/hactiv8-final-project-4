const { Comment } = require('../models');

const authorizationComment = async (req, res, next) => {
  const commentId = +req.params.commentId;

  const authenticatedUser = res.locals.user;
  try {
    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return res.status(404).json({
        name: 'Data Not Found',
        message: `Comment With id ${commentId} not found`,
      });
    }
    if (comment.UserId === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        message: `User with id ${authenticatedUser.id} does not have permission to access Comment with id ${commentId}`,
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = authorizationComment;
