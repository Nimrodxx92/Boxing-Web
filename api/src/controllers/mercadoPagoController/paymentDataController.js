const axios = require("axios");
require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const { putOrderController } = require("../orderController/putOrderController");

const paymentDataController = async (paymentId) => {
  const accessToken = ACCESS_TOKEN;

  try {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${accessToken}`;

    const { data } = await axios.get(url);
    console.log("data=>", { data });
    const relatedOrderId = data.metadata.related_order_id;
    const paymentStatus = data.status;
    const paymentStatusDetail = data.status_detail;
    const paymentDate = data.date_approved;

    let paymentStatusToDb = "";

    if (paymentStatus === "approved") {
      paymentStatusToDb = "APROBADO";
    }

    if (paymentStatus === "rejected") {
      paymentStatusToDb = "RECHAZADO";
    }

    if (paymentStatus === "in_process") {
      paymentStatusToDb = "EN PROCESO";
    }

    await putOrderController({
      orderId: relatedOrderId,
      status: paymentStatusToDb,
      payment_status_detail: paymentStatusDetail || null,
      payment_id: paymentId || null,
      payment_date: paymentDate || null,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { paymentDataController };
