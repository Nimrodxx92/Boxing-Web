const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const {
  postOrderHandler,
  putOrderHandler,
  getUserOrdersHandler,
} = require("../handlers/orderHandlers");

orderRouter.post("/", authMiddleware, checkRol(["Client"]), postOrderHandler);
orderRouter.put("/", authMiddleware, checkRol(["Client"]), putOrderHandler);
orderRouter.get(
  "/:userId",
  authMiddleware,
  checkRol(["Client"]),
  getUserOrdersHandler
);

module.exports = orderRouter;
