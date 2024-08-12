const { Order, User } = require("../../db");

const getDashboardSummaryController = async () => {
  try {
    const approvedOrdersCount = await Order.count({
      where: { status: "APROBADO" },
    });
    const rejectedOrdersCount = await Order.count({
      where: { status: "RECHAZADO" },
    });
    const registeredUsersCount = await User.count();

    return {
      approvedOrdersCount: approvedOrdersCount || 0,
      rejectedOrdersCount: rejectedOrdersCount || 0,
      registeredUsersCount: registeredUsersCount || 0,
    };
  } catch (error) {
    throw new Error("Error al obtener el resumen de órdenes: " + error.message);
  }
};

module.exports = getDashboardSummaryController;
