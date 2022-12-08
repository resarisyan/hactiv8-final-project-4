const { SocialMedias } = require('../models');

const authorizationSocialMedia = async (req, res, next) => {
  const socialmediaId = +req.params.socialmediaId;
  console.log('MY Id: ' + socialmediaId);

  const authenticatedUser = res.locals.user;
  try {
    const socialmedia = await SocialMedias.findOne({
      where: {
        id: socialmediaId,
      },
    });
    if (!socialmedia) {
      return res.status(404).json({
        name: 'Data Not Found',
        message: `Social Media With id ${socialmediaId} not found`,
      });
    }
    if (socialmedia.UserId === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        message: `User with id ${authenticatedUser.id} does not have permission to access Social Media with id ${socialmediaId}`,
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = authorizationSocialMedia;
