import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginLocal } from "../redux/userLocalActions";
import LoginButton from "../loginComponent/loginButton/loginButton";
import { Link } from "react-router-dom";

const LocalLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (userData) {
      dispatch(loginLocal(userData?.email, userData?.password));
    } else {
      alert("El email o la contraseña no coincide");
    }
  };
  return (
    <div>
      <h1>Local Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
        <button>
          <LoginButton />
        </button>

        <Link to="/LocalLogin" className="login">
          Login
        </Link>

        <Link to="/RegistroLocal">REGISTRO LOCAL</Link>
      </form>
    </div>
  );
};

export default LocalLogin;
