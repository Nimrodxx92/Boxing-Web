import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/box-logo.png";
import MobileNav from "./MobileNav";
import { useAuth0 } from "@auth0/auth0-react"; // Importa el hook de Auth0
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userLocalSlice";

function NavBar() {
  const { isAuthenticated: isAuthenticatedAuth0, logout: logoutAuth0 } =
    useAuth0();

  const isAuthenticatedRedux = useSelector(
    (state) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();

  const isAuthenticated = isAuthenticatedAuth0 || isAuthenticatedRedux;

  const NavLinks = [
    { to: "/", label: "Inicio" },
    { to: "/Nosotros", label: "Nosotros" },
    { to: "/Entrenamiento", label: "Entrenamiento" },
    { to: "/Precios", label: "Precios" },
    { to: "/Contacto", label: "Contacto" },
  ];

  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    if (isAuthenticatedAuth0) {
      logoutAuth0();
    }
    if (isAuthenticatedRedux) {
      dispatch(logoutUser());
    }
  };

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
      <nav className="nav-wrapper">
        <div className="nav-content">
          <div className="logo">
            <NavLink to="/">
              <img src={Logo} alt="Logo Boxeo" />
            </NavLink>
          </div>
          <ul className="nav-links">
            {NavLinks.map((link, index) => (
              <li className="navlinks-li" key={index}>
                <Link to={link.to} className="links">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="menu-btn" onClick={toggleMenu}>
            <span style={{ fontSize: "1.4rem" }}>
              {openMenu ? <span style={{ marginTop: "7px" }}>X</span> : "☰"}
            </span>
          </button>
          <div className="boton-register">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="login">
                CERRAR SESIÓN
              </button>
            ) : (
              <Link to="/LocalLogin" className="login">
                INICIAR SESIÓN
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
