const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 35]
      }
    }, 
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    // foreign key based on id from User model
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    // timestamps passed to page 
    timestamps: true, 
    freezeTableName: true, 
    underscored: true,
    modelName: 'Post'
  }
);

module.exports = Post;
