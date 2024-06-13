const { Router } = require("express");

const { mercadoPagoHandler } = require("../handlers/mercadoPagoHanlders");

const shoppingCartRouter = Router();

shoppingCartRouter.use("/", mercadoPagoHandler);

module.exports = shoppingCartRouter;
