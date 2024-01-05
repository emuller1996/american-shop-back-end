const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
      },
      id_pago_merca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      net_received_amount: {
        type: DataTypes.DECIMAL,
      },
      net_amount: {
        type: DataTypes.DECIMAL,
      },
      fee_details_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      external_resource_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_approved: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
