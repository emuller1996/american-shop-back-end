const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.BIGINT,
        validate: {
          isInt: true,
          isNumeric: true,
        },
      },
      documentType: {
        type: DataTypes.STRING,
      },
      documentNumber: {
        type: DataTypes.BIGINT,
      },
    },
    {
      timestamps: true,
    }
  );
};
