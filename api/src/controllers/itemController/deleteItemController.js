const { Item } = require("../../db");
const { updateCartTotalPrice } = require("./updateCartTotalPrice");

const deleteItemController = async (id, OrderId) => {
  try {
    await Item.destroy({
      where: {
        id,
      },
    });

    await updateCartTotalPrice(OrderId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteItemController };
