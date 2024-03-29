// indexRouter.js
const { Router } = require("express");
const { Payments } = require("../db");
const { paymentsData } = require("../../api");
const paymentsRouter = require("./paymentsRouter");
const auth0Router = require("./auth0Router");
const registerLocalRouter = require('./registerLocalRouter');
const localLoginRouter = require('./localLoginRouter');

const router = Router();

router.use("/payments", paymentsRouter);

router.use("/auth0", auth0Router);

router.use('/register', registerLocalRouter);

router.use('/login', localLoginRouter);

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
