import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
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
    loginlocal: (state, action) => {
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
    },
  },
});

export const {
  registerUserSuccess,
  registerUserFailure,
  loginlocal,
  loginLocalFailure,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
