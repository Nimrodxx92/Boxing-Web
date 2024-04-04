const { Payments } = require("../../db");

const getPaymentsById = async (paymentsId) => {
  console.log("Esta es la data => ", paymentsId);
  try {
    const payments = await Payments.findOne({
      where: {
        id: paymentsId,
      },
    });
    return payments;
  } catch (error) {
    throw new Error("Error al obtener Abono por ID: " + error.message);
  }
};

module.exports = {
  getPaymentsById,
};
