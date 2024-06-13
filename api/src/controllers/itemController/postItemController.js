const { Item } = require("../../db");
const { updateCartTotalPrice } = require("./updateCartTotalPrice");

const postItemController = async (
  PaymentId,
  OrderId,
  final_price,
  quantity,
  amount
) => {
  // Crear el nuevo artículo y asociarlo al carrito
  try {
    const newItem = await Item.create({
      PaymentId,
      OrderId,
      final_price,
      quantity,
      amount,
    });

    await updateCartTotalPrice(OrderId);

    return newItem;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postItemController };
