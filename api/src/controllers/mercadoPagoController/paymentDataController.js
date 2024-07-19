const axios = require('axios');
require('dotenv').config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const paymentDataController = async (paymentId) => {
  const accessToken = ACCESS_TOKEN;

  try {
    const url = `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${accessToken}`;

    const { data } = await axios.get(url);
    console.log("data =>", data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los datos del pago");
  }
};

module.exports = { paymentDataController };
