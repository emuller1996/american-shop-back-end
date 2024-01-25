import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Message",
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      written: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
