const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "SubComment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      write_by: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
