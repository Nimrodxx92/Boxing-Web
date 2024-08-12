import { configureStore } from "@reduxjs/toolkit";
import paymentsReducer from "./paymentsSlice";
import userReducer from "./userLocalSlice";
import shopingCartReducer from "./shopingCartSlice";
// import authReducer from "./authSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
  reducer: {
    payments: paymentsReducer,
    user: userReducer,
    shopingCartReducer: shopingCartReducer,
    // auth: authReducer,
    admin: adminSlice,
  },
});

export default store;
