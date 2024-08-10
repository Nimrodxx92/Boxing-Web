const express = require("express");
const adminRouter = express.Router();
const {
  getAllPaymentsHandlers,
  putPaymentHandler,
  getUserHandler,
  getPaymentCountHanlder,
  deleteUserHanlder,
} = require("../handlers/adminHanlders");
const authMiddleware = require("../middleware/session");

adminRouter.get("/user", authMiddleware, getUserHandler);
adminRouter.get("/payments", authMiddleware, getAllPaymentsHandlers);
adminRouter.put("/put-payment", putPaymentHandler);
adminRouter.get("/payment-count", getPaymentCountHanlder);
adminRouter.delete("/delete-user/:id", deleteUserHanlder);

module.exports = adminRouter;
