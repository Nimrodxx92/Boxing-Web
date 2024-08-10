require("dotenv").config();
const mercadopago = require("mercadopago");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
  sandbox: true,
});

const mercadoPago = (pendingOrderId, itemsBody) => {
  let preference = {
    metadata: { relatedOrderId: pendingOrderId },
    items: itemsBody,

    back_urls: {
      success: "http://localhost:5173/orderStatus",
      failure: "http://localhost:5173/orderStatus",
      pending: "http://localhost:5173/orderStatus",
    },
    auto_return: "approved",
  };

  const preferenceId = mercadopago.preferences
    .create(preference)
    .then(function (response) {
      return response.body;
    })
    .catch(function (error) {
      throw error;
    });

  return preferenceId;
};

module.exports = mercadoPago;
