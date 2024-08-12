// src/redux/adminSlice.js

import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

// Define el slice de administración
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    payments: [],
    user: null,
    paymentCount: 0,
    dashboardSummary: {
      approvedOrdersCount: 0,
      rejectedOrdersCount: 0,
      registeredUsersCount: 0,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPaymentCount: (state, action) => {
      state.paymentCount = action.payload;
    },
    setDashboardSummary: (state, action) => {
      state.dashboardSummary = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPayments,
  setUser,
  setPaymentCount,
  setDashboardSummary,
  setStatus,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;

// Action Creators

export const fetchAllPayments = () => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.get("/admin/payments");
    dispatch(setPayments(response.data));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const updatePayment = (id, paymentData) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.put(`/admin/put-payment/${id}`, paymentData);
    dispatch(fetchAllPayments(response)); // Refresh the payments list
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.get("/admin/user");
    console.log(response.data);
    dispatch(setUser(response.data));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const fetchPaymentCount = () => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.get("/admin/payment-count");
    dispatch(setPaymentCount(response.data));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    await api.delete(`/admin/delete-user/${id}`);
    dispatch(fetchUser()); // Refresh the user list
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};

export const fetchDashboardSummary = () => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const response = await api.get("/admin/dashboard-summary");
    dispatch(setDashboardSummary(response.data));
    dispatch(setStatus("succeeded"));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setStatus("failed"));
  }
};
