const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      autoIncrement: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // creates foreign key based on id from User model
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    // creates foreign key based on id from Post model
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    // timestamp data used when rendering page
    timestamps: true,
    freezeTableName: true,
    underscored: true, 
    modelName: 'Comment'
  }
);

module.exports = Comment;
