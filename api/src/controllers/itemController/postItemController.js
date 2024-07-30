// In your controller (e.g., itemController.js)
const { Item, Payments } = require("../../db"); 

const postItemController = async (PaymentId, OrderId, final_price, quantity, amount) => {
  try {
    const paymentExists = await Payments.findByPk(PaymentId);
    if (!paymentExists) {
      throw new Error(`Payment with id ${PaymentId} does not exist`);
    }

    const existingItem = await Item.findOne({
      where: {
        OrderId,
        final_price,
      },
    });

    if (existingItem) {
      return existingItem;
    }

    const newItem = await Item.create({
      PaymentId,
      OrderId,
      final_price,
      quantity,
      amount,
    });

    return newItem;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { postItemController };
