const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Dept extends Model {}

Dept.init(
  {
      id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
      name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dept',
  }
);

module.exports = Dept;
