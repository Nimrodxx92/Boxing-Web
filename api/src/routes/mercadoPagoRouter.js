const { Router } = require("express");
const mercadoPagoRouter = Router();
const {
  mercadoPagoHandler,
  paymentDataHandler,
} = require("../handlers/mercadoPagoHanlders.js");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

mercadoPagoRouter.post(
  "/create-preference/:userEmail",
  authMiddleware,
  checkRol(["Client"]),
  mercadoPagoHandler
);
mercadoPagoRouter.post(
  "/order-update/:paymentId",
  authMiddleware,
  checkRol(["Client"]),
  paymentDataHandler
);

module.exports = mercadoPagoRouter;
