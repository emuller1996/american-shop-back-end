const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ProductSize",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
