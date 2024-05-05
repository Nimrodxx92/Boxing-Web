const { Router } = require("express");
const mercadoPagoRouter = Router();
const { mercadoPagoHandler } = require("../handlers/mercadoPagoHanlders.js");

mercadoPagoRouter.post("/create-preference/:userEmail", mercadoPagoHandler);

module.exports = mercadoPagoRouter;
