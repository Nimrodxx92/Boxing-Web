import axios from "axios";
import store from "../src/redux/store"; // Importa tu tienda de Redux

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    console.log(state);
    const token = state.user.token; // O donde tengas guardado el token
    console.log("este token => ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
