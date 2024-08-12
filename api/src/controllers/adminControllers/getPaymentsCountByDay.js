const { Order } = require("../../db");
const { Sequelize } = require("sequelize");

const getPaymentsCountByDay = async () => {
  try {
    const paymentsByDay = await Order.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("payment_date")), "date"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["date"],
      order: [[Sequelize.col("date"), "ASC"]],
    });

    const result = paymentsByDay.map((payment) => ({
      date: payment.getDataValue("date"),
      count: payment.getDataValue("count"),
    }));

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error al obtener el conteo de pagos por día:", error);
    throw error;
  }
};

module.exports = getPaymentsCountByDay;
