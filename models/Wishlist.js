const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User')

class Wishlist extends Model {
}

Wishlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    wishlist_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'wishlist',
  }
);

module.exports = Wishlist;