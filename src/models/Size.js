const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Size",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      size: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
