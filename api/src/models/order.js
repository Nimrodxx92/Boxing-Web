const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    payment_date: {
      type: DataTypes.DATE, // O DataTypes.DATEONLY si solo necesitas la fecha
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_status_detail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
