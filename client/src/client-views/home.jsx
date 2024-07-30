import img1 from "../assets/box.jpg";
import img2 from "../assets/box-dos.jpg";
import img3 from "../assets/box-tres.jpg";
import benefits from "../json/benefits.json";
import api from "../api";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOrderCase, getItems } from "../redux/shopingCartSlice";

const images = [
  {
    src: img1,
    text: "Entrenamiento específico para diferentes niveles y objetivos",
  },
  { src: img2, text: "Feedback y evaluación personalizada" },
  { src: img3, text: "Incorporación de técnicas de entrenamiento con cuerdas" },
];

const Home = () => {
  // const dispatch = useDispatch();
  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const allItems = useSelector((state) => state.shopingCartReducer.itemsOrder);
  const isLocalAuthenticated = useSelector(
    (state) => state.user.isAuthenticated
  );
  const emailLocalUser = useSelector(
    (state) => state.user && state.user.user && state.user.user.email
  );

  useEffect(() => {
    if (isLocalAuthenticated && !allItems.length && emailLocalUser) {
      api
        .post("/order", { email: emailLocalUser })
        .then((response) => {
          return response        })
        .catch((error) => {
          throw error
        });
    }
  });

  return (
    <>
      <section className="home__container">
        <div className="title__container">
          <h1>
            <span className="s1">Team</span>
            <span className="s2">Diego Noriega</span>
          </h1>
          <p>Donde cada golpe cuenta una historia</p>
          <p>de valentía y perseverancia.</p>
          <Link to="Entrenamiento">
            <button className="btn-home">Ver más</button>
          </Link>
        </div>
      </section>
      <section className="subhome__container">
        <div className="second__container">
          <h2>¿Por qué elegirnos?</h2>
          <div className="linea"></div>
          <div className="img__container">
            {images.map((image, index) => (
              <div key={index} className="img-subhome">
                <img src={image.src} alt={`Imagen ${index + 1}`} />
                <p>{image.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="benefits__container">
        <div className="third__title">
          <h3>Beneficios</h3>
          <div className="linea"></div>
          <div className="benefits-container">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit">
                <img src={benefit.img} alt={benefit.name} />
                <h4>{benefit.name}</h4>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
