import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userLocalActions";

const RegisterLocal = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    // repeatPassword: "",
  });
  const dispatch = useDispatch();

  const handleRegistration = () => {
    if (userData) {
      dispatch(
        registerUser(userData?.name, userData?.email, userData?.password)
      );
    } else {
      alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
    }
  };
  return (
    <div>
      <div>
        <h1>Registrarse</h1>

        <div>
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
          {/* <div>
            <span>Repetir Contraseña</span>
            <input
              type="password"
              value={userData.repeatPassword}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </div> */}
        </div>
        <button onClick={handleRegistration}>Registrarse</button>
      </div>
    </div>
  );
};

export default RegisterLocal;
