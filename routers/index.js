const express = require('express');
const router = express.Router();
const UserControlller = require('../controllers/userController');
const PhotoControlller = require('../controllers/photoController');
const CommmentPhotoControlller = require('../controllers/commentPhotoController');
const SocialMediaControlller = require('../controllers/socialMediaController');

const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');
const authorizationPhoto = require('../middleware/authorizationPhoto');
const authorizationComment = require('../middleware/authorizationComment');
const authorizationSocialMedia = require('../middleware/authorizationSocialMedia');

// Users
router.post('/users/login', UserControlller.Login);
router.post('/users/register', UserControlller.Register);
router.put(
  '/users/:userId',
  authentication,
  authorizationUser,
  UserControlller.UpdateUserById
);
router.delete(
  '/users/:userId',
  authentication,
  authorizationUser,
  UserControlller.DeleteUserById
);

// Photos
router.get('/photos', authentication, PhotoControlller.GetAllPhoto);
router.post('/photos', authentication, PhotoControlller.CreatePhoto);
router.put(
  '/photos/:photoId',
  authentication,
  authorizationPhoto,
  PhotoControlller.UpdatePhotoById
);
router.delete(
  '/photos/:photoId',
  authentication,
  authorizationPhoto,
  PhotoControlller.DeletePhotoById
);

// Comment
router.get(
  '/comments',
  authentication,
  CommmentPhotoControlller.GetAllComment
);
router.post(
  '/comments',
  authentication,
  CommmentPhotoControlller.CreateComment
);
router.put(
  '/comments/:commentId',
  authentication,
  authorizationComment,
  CommmentPhotoControlller.UpdateCommentById
);
router.delete(
  '/comments/:commentId',
  authentication,
  authorizationComment,
  CommmentPhotoControlller.DeleteCommentById
);

// Social Media
router.get(
  '/socialmedias',
  authentication,
  SocialMediaControlller.GetAllSocialMedia
);
router.post(
  '/socialmedias',
  authentication,
  SocialMediaControlller.CreateSocialMedia
);
router.put(
  '/socialmedias/:socialmediaId',
  authentication,
  authorizationSocialMedia,
  SocialMediaControlller.UpdateSocialMediaById
);
router.delete(
  '/socialmedias/:socialmediaId',
  authentication,
  authorizationSocialMedia,
  SocialMediaControlller.DeleteSocialMediaById
);

// 404
router.use((req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.APP_PORT;
  const fullUrl = `${protocol}://${host}:${port}${url}`;
  res.status(404).send({
    devMessage: `Route ${fullUrl} Not Found`,
  });
});

module.exports = router;
