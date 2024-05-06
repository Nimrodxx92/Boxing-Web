import { configureStore } from "@reduxjs/toolkit";
import paymentsReducer from "./paymentsSlice";
import userReducer from "./userLocalSlice";

const store = configureStore({
  reducer: {
    payments: paymentsReducer,
    user: userReducer,
  },
});

export default store;
