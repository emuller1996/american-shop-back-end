import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "DeliveryAddress",
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
      city: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      neighborhood: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      reference: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
