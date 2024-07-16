import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/userLocalActions";
import Home from "../client-views/home"; // Importa el componente Home

const RegisterLocal = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  // Selecciona los errores del estado de Redux y proporciona un valor predeterminado vacío si es null o undefined
  const errors = useSelector((state) => state.user.error) || [];

  const handleRegistration = async () => {
    if (
      userData.name &&
      userData.surname &&
      userData.email &&
      userData.password
    ) {
      try {
        const response = await dispatch(
          registerUser(
            userData.name,
            userData.surname,
            userData.email,
            userData.password
          )
        );
  
        // Verifica la estructura de la respuesta para asegurarte de acceder correctamente a los datos
        console.log(response.status);
  
        if (response.status === 201) {
          setRegistered(true);
        } else {
          setRegistrationError(true);
        }
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        setRegistrationError(true);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };
  
  if (registered) {
    return <Home />;
  }
  // Encuentra el error específico de cada campo
  const getErrorMessage = (field) => {
    const error = errors.find((err) => err.path === field);
    return error ? error.msg : null;
  };

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
              {getErrorMessage("name") && (
                <div className="error-message">{getErrorMessage("name")}</div>
              )}
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
              {getErrorMessage("surname") && (
                <div className="error-message">{getErrorMessage("surname")}</div>
              )}
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
              {getErrorMessage("email") && (
                <div className="error-message">{getErrorMessage("email")}</div>
              )}
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
              {getErrorMessage("password") && (
                <div className="error-message">{getErrorMessage("password")}</div>
              )}
            </div>
          </div>
          <button onClick={handleRegistration}>Registrarse</button>
          {registrationError && <div className="error-message">Error en el registro. Por favor, intente de nuevo.</div>}
        </div>
      </div>
    </>
  );
};

export default RegisterLocal;
