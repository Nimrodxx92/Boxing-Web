import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const links = [
    { to: "/", label: "Inicio" },
    { to: "Nosotros", label: "Nosotros" },
    { to: "Entrenamiento", label: "Entrenamiento" },
    { to: "Precios", label: "Precios" },
    { to: "Contacto", label: "Contacto" },
  ];

  return (
    <footer className="footer">
      <section className="container__footer">
        <div className="data__footer">
          <h4>Dirección</h4>
          <p>Arturo Guastavino 3750,</p>
          <p>Castelar Sur, Bs As (CP: 1712)</p>
        </div>
        <div className="redes__footer">
          <h4>Redes sociales</h4>
          <div className="icons__redes">
            {[
              { href: "https://www.instagram.com/", icon: faInstagram },
              { href: "https://www.facebook.com/", icon: faFacebook },
              { href: "https://www.whatsapp.com/", icon: faWhatsapp },
            ].map((social, index) => (
              <a
                key={index}
                className={`${social.icon.iconName}-icon`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p>Teléfono: </p>
          <p>11-6488-4537</p>
          <p>Email: </p>
          <p>diegonoriega@gmail.com</p>
        </div>
        <nav className="nav__footer">
          <ul className="footer__links">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink to={link.to} className="links__footer">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <div className="separador"></div>
      <p className="copy__name">
        &copy; {new Date().getFullYear()} Diego Noriega
      </p>
    </footer>
  );
};

export default Footer;
