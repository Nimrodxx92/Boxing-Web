const express = require("express");
const orderRouter = express.Router();
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");
const {
  postOrderHandler,
  putOrderHandler,
} = require("../handlers/orderHandlers");

orderRouter.post("/", authMiddleware, checkRol(["Admin"]), postOrderHandler);
orderRouter.put("/", authMiddleware, checkRol(["Admin"]), putOrderHandler);

module.exports = orderRouter;
