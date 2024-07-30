const { Order } = require("../../db");

const putOrderController = async ({
  orderId,
  status,
  payment_date,
  payment_id,
  payment_status_detail,
  total_price,
}) => {
  try {
    if (orderId) {
      const orderToBeModified = await Order.findOne({
        where: {
          id: orderId,
        },
      });

      if (!orderToBeModified) {
        throw new Error(`Order with ID ${orderId} not found`);
      }

      const updateData = {};

      if (status) updateData.status = status;
      if (payment_date) updateData.payment_date = payment_date;
      if (payment_id) updateData.payment_id = payment_id;
      if (payment_status_detail) updateData.payment_status_detail = payment_status_detail;
      if (total_price) updateData.total_price = total_price;

      await Order.update(updateData, {
        where: {
          id: orderToBeModified.dataValues.id,
        },
      });

      return "Order actualizada correctamente";
    }
  } catch (error) {
    console.error("Error en putOrderController:", error.message);
    throw error;
  }
};

module.exports = { putOrderController };
