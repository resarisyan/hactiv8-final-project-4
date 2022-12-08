const { Photo, User, Comment } = require('../models');
const { sequelize } = require('../models/index');

class PhotoControlller {
  static async GetAllPhoto(req, res) {
    const user = res.locals.user.id;
    try {
      const result = await Photo.findAll({
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'profile_image_url'],
          },
          {
            model: Comment,
            attributes: ['comment'],
            include: [{ model: User, attributes: ['username'] }]
          }
        ],

        where: {
          UserId: user,
        },
      });
      return res.status(200).json({ photos: result });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async CreatePhoto(req, res) {
    const { poster_image_url, title, caption } = req.body;
    const user = res.locals.user.id;

    try {
      const result = await Photo.create({
        poster_image_url,
        title,
        caption,
        created_at: new Date(),
        updated_at: new Date(),
        UserId: user,
      });

      let response = {
        id: result.id,
        poster_image_url: result.poster_image_url,
        title: result.title,
        caption: result.caption,
        UserId: result.UserId,
      };

      return res.status(201).json(response);
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

  static async UpdatePhotoById(req, res) {
    let id = +req.params.photoId;
    const { poster_image_url, title, caption } = req.body;

    let data = {
      poster_image_url,
      title,
      caption,
      updated_at: new Date(),
    };

    try {
      let photo = await Photo.update(data, {
        where: {
          id,
        },
        returning: true,
      });

      photo = photo[1][0].dataValues;
      return res.status(200).json({ photo });
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

  static async DeletePhotoById(req, res) {
    let id = +req.params.photoId;
    try {
      await Photo.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Your photo has been successfully deleted',
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

module.exports = PhotoControlller;
