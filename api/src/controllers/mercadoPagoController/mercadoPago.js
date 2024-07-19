require("dotenv").config();
const mercadopago = require("mercadopago");
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

mercadopago.configure({
  access_token: ACCESS_TOKEN,
  sandbox:true,
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
    notification_url: "https://a5b5-2800-810-497-27f1-3dfb-bdf7-7dad-c62.ngrok-free.app/order-update"
  };

  const preferenceId = mercadopago.preferences
    .create(preference)
    .then(function (response) {
      return response.body
    })
    .catch(function (error) {
      console.log(error);
    });

  return preferenceId;
};

module.exports = mercadoPago;
