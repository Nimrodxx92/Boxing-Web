const { Order, User } = require("../../db");
const getPendingOrderByUserEmailController = async (userEmail) => {
  try {
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });
    const userOrder = await Order.findOne({
      where: {
        UserId: user.dataValues.id,
        status: "PENDIENTE",
      },
    });
    return userOrder.dataValues.id;
  } catch (error) {
    throw new Error("Error al obtener la orden: " + error.message);
  }
};

module.exports = { getPendingOrderByUserEmailController };
