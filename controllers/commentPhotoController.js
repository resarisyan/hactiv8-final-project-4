const { Comment, Photo, User } = require('../models');

class CommentPhotoControlller {
  static async GetAllComment(req, res) {
    const user = res.locals.user.id;
    try {
      const result = await Comment.findAll({
        include: [
          {
            model: Photo,
            attributes: [
              'id',
              'title',
              'caption',
              'poster_image_url',
            ],
          },
          {
            model: User,
            attributes: [
              'id',
              'username',
              'profile_image_url',
              'phone_number',
            ],
          },
        ],
        where: {
          UserId: user,
        },
      });
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async CreateComment(req, res) {
    const { comment, PhotoId } = req.body;
    const user = res.locals.user.id;

    try {
      const result = await Comment.create({
        comment,
        PhotoId,
        UserId: user,
        created_at: new Date(),
        updated_at: new Date(),
      });

      let response = {
        comment: {
          id: result.id,
          comment: result.comment,
          UserId: result.UserId,
          updatedAt: result.updatedAt,
          createdAt: result.createdAt,
        },
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

  static async UpdateCommentById(req, res) {
    let id = +req.params.commentId;
    const { comment } = req.body;

    let data = {
      comment,
      updated_at: new Date(),
    };

    try {
      let result = await Comment.update(data, {
        where: {
          id,
        },
        returning: true,
      });
      result = result[1][0].dataValues;
      console.log(result);
      const payload = {
        comment: {
          id: result.id,
          comment: result.comment,
          UserId: result.UserId,
          PhotoId: result.PhotoId,
          updatedAt: result.updatedAt,
          createdAt: result.createdAt,
        },
      };
      return res.status(200).json(payload);
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

  static async DeleteCommentById(req, res) {
    let id = +req.params.commentId;
    try {
      await Comment.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Your comment has been successfully deleted',
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

module.exports = CommentPhotoControlller;
