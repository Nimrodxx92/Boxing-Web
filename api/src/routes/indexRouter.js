// indexRouter.js
const { Router } = require("express");
const { Payments } = require("../db");
const { paymentsData } = require("../../api");

const auth0Router = require("./auth0Router");
const registerLocalRouter = require("./registerLocalRouter");
const localLoginRouter = require("./localLoginRouter");
const mercadoPagoRouter = require("./mercadoPagoRouter");
const paymentsRouter = require("./paymentsRouter");
const adminRouter = require("./adminRoutes");
const orderRouter = require("./orderRoutes");
const itemRouter = require("./itemRouter");
const shoppingCartRouter = require("./shoppingCartRouter");

const router = Router();

router.use("/admin", adminRouter);

router.use("/auth0", auth0Router);

router.use("/register", registerLocalRouter);

router.use("/login", localLoginRouter);

router.use("/mercadoPago", mercadoPagoRouter);

router.use("/payments", paymentsRouter);

router.use("/order", orderRouter);

router.use("/item", itemRouter);

router.use("/shoppingCart", shoppingCartRouter);

router.use("/api", async (req, res) => {
  const allPayments = await Payments.findAll();

  if (!allPayments.length) {
    await Payments.bulkCreate(paymentsData);
    res.status(200).json("Abonos Cargados");
  } else {
    res.status(200).json("Abonos ya han sido cargados");
  }
});

module.exports = router;
