import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Images",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageBase64: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
