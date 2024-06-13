import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./sass/main.css";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      /* onRedirectCallback={onRedirectCallback} */
    >
      <App />
    </Auth0Provider>
  </Provider>
);
