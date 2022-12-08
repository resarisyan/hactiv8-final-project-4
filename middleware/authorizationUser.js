const { User } = require('../models');

const authorizationUser = async (req, res, next) => {
  const userId = +req.params.userId;

  const authenticatedUser = res.locals.user;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        name: 'Data Not Found',
        message: `User With id ${userId} not found`,
      });
    }
    console.log(authenticatedUser.id);
    if (user.id === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        name: 'Authorization Error',
        message: `User with id ${authenticatedUser.id} does not have permission to access User with id ${userId}`,
      });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = authorizationUser;
