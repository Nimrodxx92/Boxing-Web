const mercadoPago = require("../controllers/mercadoPagoController/mercadopago.js");
const { getPendingOrderByUserEmailController } = require("../controllers/orderController/getPendingOrderByUserEmailController");

const mercadoPagoHandler = async (req, res) => {
  try {
    const { userEmail } = req.params;
    console.log("req.body=>", JSON.stringify(req.body, null, 2));

    const itemsBody = req.body.map((item, index) => {
      if (item.Payment && item.Payment.name) {
        return {
          title: item.Payment.name,
          unit_price: item.final_price,
          quantity: item.quantity,
        };
      } else {
        throw new Error(`Faltan datos de pago para el item ${index}`);
      }
    });

    const pendingOrderId = await getPendingOrderByUserEmailController(userEmail);
    const preference = await mercadoPago(pendingOrderId, itemsBody);

    // Asume que `mercadoPago` devuelve un objeto `preference` que incluye la URL de checkout
    const checkoutUrl = preference.init_point;

    res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error("Error en mercadoPagoHandler:", error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = { mercadoPagoHandler };
