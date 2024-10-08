import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginLocal } from "../redux/userLocalActions";
import LoginButton from "../loginComponent/loginButton/loginButton";
import { Link } from "react-router-dom";

const LocalLogin = ({ closeModal }) => {
  // Recibe la función closeModal como prop
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
    <>
      <form>
        <div className="borderlogins">
          <div className="forms">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
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
          </div>
        </div>
        <div className="logins">
          <button className="btn-login" type="button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
          <Link to="/RegistroLocal" onClick={closeModal}>
            Registrarse
          </Link>
          <LoginButton />
        </div>
      </form>
    </>
  );
};

export default LocalLogin;
