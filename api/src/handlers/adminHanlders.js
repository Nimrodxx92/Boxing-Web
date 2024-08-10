const getUserController = require("../controllers/adminControllers/getUserController");
const getAllPaymentsController = require("../controllers/adminControllers/getAllPaymentsControllers");
const putPaymentController = require("../controllers/adminControllers/putPaymentController");
const getPaymentsCountByDay = require("../controllers/adminControllers/getPaymentsCountByDay");
const deleteUserController = require("../controllers/adminControllers/deleteUserController");

const getUserHandler = async (req, res) => {
  try {
    const allUser = await getUserController();
    res.status(200).send(allUser);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAllPaymentsHandlers = async (req, res) => {
  try {
    const allPayments = await getAllPaymentsController();
    res.status(200).send(allPayments);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const putPaymentHandler = (req, res) => {
  try {
    const data = putPaymentController();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

const getPaymentCountHanlder = (req, res) => {
  try {
    const data = getPaymentsCountByDay();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

const deleteUserHanlder = (req, res) => {
  try {
    const userId = req.params.id;
    const data = deleteUserController(userId);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getUserHandler,
  getAllPaymentsHandlers,
  putPaymentHandler,
  getPaymentCountHanlder,
  deleteUserHanlder,
};
