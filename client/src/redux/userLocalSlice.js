import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerUserFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    loginLocalSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginLocalFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFailure,
  loginLocalSuccess,
  loginLocalFailure,
  logoutUser,
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
