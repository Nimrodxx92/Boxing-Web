const { Router } = require("express");
const { mercadoPagoHandler } = require("../handlers/mercadoPagoHanlders");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

const shoppingCartRouter = Router();

shoppingCartRouter.use(
  "/",
  authMiddleware,
  checkRol(["Client"]),
  mercadoPagoHandler
);

module.exports = shoppingCartRouter;
