import api from "../api";
import { getAllPayments, getPaymentsDetail } from "./paymentsSlice";

export const getPayments = () => async (dispatch) => {
  try {
    const response = await api.get("/payments");
    const allPayments = response.data;
    dispatch(getAllPayments(allPayments));
  } catch (error) {
    console.error(error);
  }
};

export const fetchDetailPayments = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/payments/${id}`);
    const detailPayments = response.data;
    dispatch(getPaymentsDetail(detailPayments));
  } catch (error) {
    console.log(error);
  }
};
