const {
  mercadoPago,
} = require("../controllers/mercadoPagoController/mercadopago.js");

const {
  getPendingOrderByUserEmailController,
} = require("../controllers/orderController/getPendingOrderByUserEmailController");
const mercadoPagoHandler = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const itemsBody = req.body.map((item) => {
      return {
        title: item.Payments.name,
        unit_price: item.final_price,
        quantity: item.quantity,
      };
    });
    const pendingOrderId = await getPendingOrderByUserEmailController(
      userEmail
    );

    const preferenceId = await mercadoPago(pendingOrderId, itemsBody);

    res.status(200).json(preferenceId);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { mercadoPagoHandler };
