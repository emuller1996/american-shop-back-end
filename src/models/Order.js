const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

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
      }
    },
    {
      timestamps: true,
    }
  );  
 }