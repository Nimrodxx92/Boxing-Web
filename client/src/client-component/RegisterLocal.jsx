import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userLocalActions";
import Home from "../client-views/home"; // Importa el componente Precios

const RegisterLocal = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(false);

  const handleRegistration = async () => {
    if (
      userData.name &&
      userData.surname &&
      userData.email &&
      userData.password
    ) {
      await dispatch(
        registerUser(
          userData?.name,
          userData?.surname,
          userData?.email,
          userData?.password
        )
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
          <div className="input-container">
            <div className="input-group">
              <input
                type="text"
                placeholder="Nombre"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Apellido"
                value={userData.surname}
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <button onClick={handleRegistration}>Registrarse</button>
        </div>
      </div>
    </>
  );
};

export default RegisterLocal;
