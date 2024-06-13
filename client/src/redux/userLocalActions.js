import api from "../api";
import {
  registerUserFailure,
  registerUserSuccess,
  loginLocalSuccess,
  loginLocalFailure,
} from "./userLocalSlice";
import { setToken } from "./userLocalSlice";

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });

    dispatch(registerUserSuccess(response.data.data.user));
    dispatch(setToken(response.data.data.token));
    localStorage.setItem("token", response.data.data.token);
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};

export const loginLocal = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    dispatch(loginLocalSuccess(response.data.data.user));
    dispatch(setToken(response.data.data.token));
    localStorage.setItem("token", response.data.data.token);
  } catch (error) {
    dispatch(loginLocalFailure(error.message));
  }
};
