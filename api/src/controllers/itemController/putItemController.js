const { Item } = require("../../db");
const { updateCartTotalPrice } = require("./updateCartTotalPrice");

const putItemController = async (orderId, itemId, quantity, amount) => {
  await Item.update(
    { quantity, amount },
    {
      where: {
        id: itemId,
      },
    }
  );

  await updateCartTotalPrice(orderId);
  return "Item actualizado correctamente";
};

module.exports = { putItemController };
