import { DataTypes } from 'sequelize';

export default (sequelize) => {

  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_payment: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0.01,
        },
      },
      purchase_date : {
        type : DataTypes.DATE,
        allowNull : false
      },
      status: {
        type: DataTypes.ENUM("PENDIENTE", "EN PROCESO", "EN CAMINO", "RECIBIDA", "CANCELADA"),
        allowNull: false,
      }
    },
    {
      timestamps: true,
    }
  );  
 }