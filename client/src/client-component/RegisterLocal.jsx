import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userLocalActions";
import Home from "../client-views/home"; // Importa el componente Precios

const RegisterLocal = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(false);
  const handleRegistration = async () => {
    if (userData) {
      await dispatch(
        registerUser(userData?.name, userData?.email, userData?.password)
      );
      setRegistered(true);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };
  if (registered) {
    return <Home />;
  }

  return (
    <>
      <div className="container__register">
        <h1>Registrarse</h1>
        <div className="container__forms">
          <div>
            <span>Nombre y Apellido</span>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div>
            <span>Email:</span>
            <input
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div>
            <span>Password:</span>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
        </div>
        <button onClick={handleRegistration}>Registrarse</button>
      </div>
    </>
  );
};

export default RegisterLocal;
