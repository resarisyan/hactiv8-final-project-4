const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserControlller {
  static async Login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user)
        return res.status(400).json({
          name: 'User Login Error',
          message: `User with email ${email} not found`,
        });

      const isCorrect = comparePassword(password, user.password);
      if (!isCorrect)
        return res.status(400).json({
          name: 'User Login Error',
          message: `User's password with email ${email} does not match`,
        });

      let payload = {
        id: user.id,
        email: user.email,
      };

      const token = generateToken(payload);
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async Register(req, res) {
    const {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    } = req.body;

    try {
      const result = await User.create({
        email,
        full_name,
        username,
        password,
        profile_image_url,
        age,
        phone_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      let response = {
        user: {
          id: result.id,
          email: result.email,
          full_name: result.full_name,
          username: result.username,
          profile_image_url: result.profile_image_url,
          age: result.age,
          phone_number: result.phone_number,
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

  static async UpdateUserById(req, res) {
    let id = +req.params.userId;
    const {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    } = req.body;

    let data = {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
      updatedAt: new Date(),
    };

    try {
      let result = await User.update(data, {
        where: {
          id,
        },
        returning: true,
        individualHooks: true,
      });

      result = result[1][0].dataValues;
      let payload = {
        email: result.email,
        full_name: result.full_name,
        username: result.username,
        profile_image_url: result.profile_image_url,
        age: result.age,
        phone_number: result.phone_number,
      };
      return res.status(200).json({ user: payload });
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

  static async DeleteUserById(req, res) {
    let id = +req.params.userId;
    try {
      await User.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        message: 'Your account has been successfully deleted',
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

module.exports = UserControlller;
