const getUserController = require("../controllers/adminControllers/getUserController");
const getAllPaymentsController = require("../controllers/adminControllers/getAllPaymentsControllers");
const putPaymentController = require("../controllers/adminControllers/putPaymentController");
const getPaymentsCountByDay = require("../controllers/adminControllers/getPaymentsCountByDay");
const deleteUserController = require("../controllers/adminControllers/deleteUserController");
const getDashboardSummaryController = require("../controllers/adminControllers/getDashboardSummaryController");

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

const putPaymentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPayment = await putPaymentController(id, updateData);

    res.status(200).send(updatedPayment);
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

const getDashboardSummaryHandler = async (req, res) => {
  try {
    const summary = await getDashboardSummaryController();
    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserHandler,
  getAllPaymentsHandlers,
  putPaymentHandler,
  getPaymentCountHanlder,
  deleteUserHanlder,
  getDashboardSummaryHandler,
};
