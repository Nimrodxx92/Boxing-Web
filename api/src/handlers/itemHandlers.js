const {
  postItemController,
} = require("../controllers/itemController/postItemController");
const {
  putItemController,
} = require("../controllers/itemController/putItemController");
const {
  deleteItemController,
} = require("../controllers/itemController/deleteItemController");

const postItemHandler = async (req, res) => {
  try {
    const { PaymentId, OrderId, final_price, quantity, amount } = req.body;
    const newItem = await postItemController(
      PaymentId,
      OrderId,
      final_price,
      quantity,
      amount
    );
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItemHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { OrderId } = req.body;
    await deleteItemController(id, OrderId);
    res.status(200).send("Se eliminó con éxito");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const putItemHandler = async (req, res) => {
  try {
    const { orderId, itemId, quantity, amount } = req.body;
    const response = await putItemController(orderId, itemId, quantity, amount);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { postItemHandler, deleteItemHandler, putItemHandler };
