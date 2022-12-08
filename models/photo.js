'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'UserId' });
      this.hasMany(models.Comment);
    }
  }
  Photo.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      caption: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  );
  return Photo;
};
