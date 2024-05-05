import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/box-logo.png";
import MobileNav from "./MobileNav";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../loginComponent/logOutButton/logOutButton";

function NavBar() {
  const { isAuthenticated } = useAuth0();

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
          {isAuthenticated && (
            <div className="boton-register">
              <LogoutButton />
            </div>
          )}
          {!isAuthenticated && (
            <div className="boton-register">
              <Link to="/LocalLogin" className="login">
                INICIAR SESIÓN
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
