const { Item } = require("../../db");
const { updateCartTotalPrice } = require("./updateCartTotalPrice");

const postItemController = async (
  PaymentId,
  OrderId,
  final_price,
  quantity,
  amount
) => {
  try {
    // Verificar si ya existe un ítem con el mismo precio en la orden
    const existingItem = await Item.findOne({
      where: {
        OrderId,
        final_price,
      },
    });

    if (existingItem) {
      // Si existe un ítem con el mismo precio, no crear un nuevo ítem
      console.log("Ya existe un ítem con el mismo precio en la orden");
      return existingItem;
    }

    // Crear el nuevo artículo y asociarlo al carrito
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
