import api from "../api";
import {
  registerUserFailure,
  registerUserSuccess,
  loginLocalSuccess,
  loginLocalFailure,
} from "./userLocalSlice";
import { setToken } from "./userLocalSlice";

export const registerUser =
  (name, surname, email, password) => async (dispatch) => {
    try {
      const response = await api.post("/register", {
        name,
        surname,
        email,
        password,
      });
      dispatch(registerUserSuccess(response.data.data.user));
      dispatch(setToken(response.data.data.token));
      localStorage.setItem("token", response.data.data.token);
      return response;
    } catch (error) {
      dispatch(registerUserFailure(error.response.data.errors));
      throw error; 
    }
};



export const loginLocal = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/login", { email, password });
    const { user, token } = response.data.data;

    console.log("Login response:", response.data.data);

    dispatch(loginLocalSuccess(user));
    dispatch(setToken(token));
    localStorage.setItem("token", token);
  } catch (error) {
    console.error("Login error:", error);
    dispatch(loginLocalFailure(error.message));
  }
};
