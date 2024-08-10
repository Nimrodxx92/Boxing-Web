const { Order } = require("../../db");
const { Sequelize } = require("sequelize");

const getPaymentsCountByDay = async () => {
  try {
    const paymentsByDay = await Order.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("payment_date")), "date"], // Agrupar por la fecha
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"], // Contar las órdenes por fecha
      ],
      group: ["date"], // Agrupando por la fecha extraída
      order: [[Sequelize.col("date"), "ASC"]], // Ordenar por fecha ascendente
    });

    // Mapear los resultados a un formato más simple
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
