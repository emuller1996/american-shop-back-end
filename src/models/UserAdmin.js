import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "UserAdmin",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
