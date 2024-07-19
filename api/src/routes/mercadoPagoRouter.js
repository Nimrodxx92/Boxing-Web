const { Router } = require("express");
const mercadoPagoRouter = Router();
const { mercadoPagoHandler, paymentDataHandler } = require("../handlers/mercadoPagoHanlders.js");


mercadoPagoRouter.post("/create-preference/:userEmail", mercadoPagoHandler);
mercadoPagoRouter.post("/order-update/:paymentId",paymentDataHandler )
module.exports = mercadoPagoRouter;
