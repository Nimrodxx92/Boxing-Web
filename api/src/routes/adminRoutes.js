const express = require("express");
const adminRouter = express.Router();
const {
  getAllPaymentsHandlers,
  putPaymentHandler,
  getUserHandler,
  getPaymentCountHanlder,
  deleteUserHanlder,
  getDashboardSummaryHandler,
} = require("../handlers/adminHanlders");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

adminRouter.get("/user", authMiddleware, checkRol(["Admin"]), getUserHandler);

adminRouter.get(
  "/payments",
  authMiddleware,
  checkRol(["Admin"]),
  getAllPaymentsHandlers
);

adminRouter.put(
  "/put-payment/:id",
  authMiddleware,
  checkRol(["Admin"]),
  putPaymentHandler
);

adminRouter.get(
  "/payment-count",
  authMiddleware,
  checkRol(["Admin"]),
  getPaymentCountHanlder
);

adminRouter.delete(
  "/delete-user/:id",
  authMiddleware,
  checkRol(["Admin"]),
  deleteUserHanlder
);

adminRouter.get(
  "/dashboard-summary",
  authMiddleware,
  checkRol(["Admin"]),
  getDashboardSummaryHandler
);

module.exports = adminRouter;
