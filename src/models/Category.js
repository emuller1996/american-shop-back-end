import { DataTypes } from 'sequelize';

export default (sequelize) => {

    sequelize.define(
      "Category",
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
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        }
      },
      {
        timestamps: false,
      }
    );
  
  }