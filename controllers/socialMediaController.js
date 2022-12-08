const { SocialMedias, User } = require('../models');

class SocialMediaController {
  static async GetAllSocialMedia(req, res) {
    const user = res.locals.user.id;
    try {
      const result = await SocialMedias.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'profile_image_url']
          },
        ],
        where: {
          UserId: user,
        },
      });
      return res.status(200).json({ social_medias: result });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async CreateSocialMedia(req, res) {
    const { name, social_media_url } = req.body;
    const user = res.locals.user.id;

    try {
      const social_media = await SocialMedias.create({
        name,
        social_media_url,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: user,
      });

      return res.status(201).json({ social_media });
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errValidation = {};
        err.errors.map((er) => {
          errValidation[er.path] = er.message;
        });
        return res.status(400).json(errValidation);
      }
      return res.status(500).json({ message: err.message });
    }
  }

  static async UpdateSocialMediaById(req, res) {
    let id = +req.params.socialmediaId;
    const { name, social_media_url } = req.body;

    let data = {
      name,
      social_media_url,
      updatedAt: new Date(),
    };

    try {
      let social_media = await SocialMedias.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      social_media = social_media[1][0].dataValues;

      return res.status(200).json({ social_media });
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errValidation = {};
        err.errors.map((er) => {
          errValidation[er.path] = er.message;
        });
        return res.status(400).json(errValidation);
      }
      return res.status(500).json({ message: err.message });
    }
  }

  static async DeleteSocialMediaById(req, res) {
    let id = +req.params.socialmediaId;
    try {
      await SocialMedias.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Your social media has been successfully deleted',
      });
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errValidation = {};
        err.errors.map((er) => {
          errValidation[er.path] = er.message;
        });
        return res.status(400).json(errValidation);
      }
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = SocialMediaController;
