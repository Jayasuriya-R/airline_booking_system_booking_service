'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Example extends Model {
    /**
     * Define associations here. Called automatically by models/index.js
     * e.g. this.belongsTo(models.User, { foreignKey: 'userId' });
     */
    static associate(models) {}
  }

  Example.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Example',
    }
  );

  return Example;
};
