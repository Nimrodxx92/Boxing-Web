const { Order, Item, Payments } = require("../../db");

const getUserOrdersController = async (userId) => {
  const cart = await Order.findAll({
    where: {
      UserId: userId,
    },
    include: {
      model: Item,
      include: Payments,
    },
  });

  return cart;
};

module.exports = { getUserOrdersController };
