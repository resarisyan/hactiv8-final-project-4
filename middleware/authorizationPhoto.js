const { Photo } = require('../models');

const authorizationPhoto = async (req, res, next) => {
  const photoId = +req.params.photoId;

  const authenticatedUser = res.locals.user;
  try {
    const photo = await Photo.findOne({
      where: {
        id: photoId,
      },
    });
    if (!photo) {
      return res.status(404).json({
        name: 'Data Not Found',
        message: `Photo With id ${photoId} not found`,
      });
    }
    if (photo.UserId === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        message: `User with id ${authenticatedUser.id} does not have permission to access Photo with id ${photoId}`,
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = authorizationPhoto;
