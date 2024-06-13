import { configureStore } from "@reduxjs/toolkit";
import paymentsReducer from "./paymentsSlice";
import userReducer from "./userLocalSlice";
// import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    payments: paymentsReducer,
    user: userReducer,
    // auth: authReducer,
  },
});

export default store;
