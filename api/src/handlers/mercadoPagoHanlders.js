const mercadoPago = require("../controllers/mercadoPagoController/mercadopago.js");
const { getPendingOrderByUserEmailController } = require("../controllers/orderController/getPendingOrderByUserEmailController");
const {paymentDataController} = require("../controllers/mercadoPagoController/paymentDataController.js")

const mercadoPagoHandler = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!Array.isArray(req.body) || req.body.length === 0) {
      throw new Error("No se proporcionaron ítems de pago");
    }

    
    const itemsBody = req.body.map((item) => ({
      id: item.PaymentId,
      title: item.title, 
      quantity: item.quantity,
      unit_price: item.final_price
    }));
    
    const pendingOrderId = await getPendingOrderByUserEmailController(userEmail);
    if (!pendingOrderId) {
      throw new Error("No se encontró una orden pendiente para el usuario");
    }

    const preference = await mercadoPago(pendingOrderId, itemsBody);
    if (!preference || !preference.init_point) {
      throw new Error("No se pudo obtener la URL de checkout");
    }

    res.status(200).json({ checkoutUrl: preference.init_point });
  } catch (error) {
    console.error("Error en mercadoPagoHandler:", error);
    res.status(400).send({ error: error.message });
  }
};



const paymentDataHandler = async (req, res) => {
  try {
    const paymentId = req.params.paymentId; 

    if (!paymentId) {
      return res.status(400).json({ error: 'Falta el ID de pago en la solicitud' });
    }

    const paymentData = await paymentDataController(paymentId);
    res.status(200).json(paymentData); 
  } catch (error) {
    console.error("Error en paymentDataHandler:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { paymentDataHandler };






module.exports = { mercadoPagoHandler , paymentDataHandler};
