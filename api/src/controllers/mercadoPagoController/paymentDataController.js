const axios = require("axios");
require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const { putOrderController } = require("../orderController/putOrderController");

const formatDate = (isoDate) => {
  if (!isoDate) return null;

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return null;

  return date.toISOString();
};

const paymentDataController = async (paymentId) => {
  const accessToken = ACCESS_TOKEN;

  try {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${accessToken}`;

    const { data } = await axios.get(url);
    console.log("La data=>", { data });

    const relatedOrderId = data.metadata.related_order_id;
    const paymentStatus = data.status;
    const paymentStatusDetail = data.status_detail;
    const paymentDate = data.date_approved;
    const totalPrice = data.transaction_amount;

    if (!relatedOrderId) {
      throw new Error("related_order_id is missing in payment data");
    }

    let paymentStatusToDb = "";

    if (paymentStatus === "approved") {
      paymentStatusToDb = "APROBADO";
    } else if (paymentStatus === "rejected") {
      paymentStatusToDb = "RECHAZADO";
    } else if (paymentStatus === "in_process") {
      paymentStatusToDb = "EN PROCESO";
    } else {
      paymentStatusToDb = "DESCONOCIDO";
    }

    const formattedPaymentDate = formatDate(paymentDate);

    await putOrderController({
      orderId: relatedOrderId,
      status: paymentStatusToDb,
      payment_status_detail: paymentStatusDetail || null,
      payment_id: paymentId || null,
      payment_date: formattedPaymentDate || null,
      total_price: totalPrice || null,
    });

    return data;
  } catch (error) {
    console.error("Error en paymentDataController:", error.message);
    throw new Error("Error al obtener los datos del pago");
  }
};

module.exports = { paymentDataController };
