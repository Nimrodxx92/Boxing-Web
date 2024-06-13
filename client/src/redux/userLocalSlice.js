import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
    },
    registerUserFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    loginLocalSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginLocalFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token"); // Eliminar el token del localStorage
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
