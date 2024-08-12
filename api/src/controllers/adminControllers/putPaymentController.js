const { Payments } = require("../../db");

const putPaymentController = async (id, updateData) => {
  try {
    const payment = await Payments.findByPk(id);

    if (!payment) {
      throw new Error("Pago no encontrado");
    }

    await payment.update(updateData);

    return payment;
  } catch (error) {
    throw new Error("Error al actualizar el pago: " + error.message);
  }
};

module.exports = putPaymentController;
