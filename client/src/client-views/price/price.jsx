import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayments } from "../../redux/paymentsActions";
import Cards from "../../client-component/cards/Cards";
import TitleComponent from "../../components/TitleComponent";
import data from "../../json/titles.json";
import api from "../../api";

const Price = () => {
  const dispatch = useDispatch();
  const allPayments = useSelector((state) => state.payments.allPayments);
  useEffect(() => {
    if (!allPayments.length) {
      api.get("/api").then(() => dispatch(getPayments()));
    }
  }, [dispatch, allPayments]);

  const descriptionPrice = [
    {
      descripcion:
        "Todas nuestras clases son físicamente exigentes y hay mucho que absorber durante los 2 días. Aprenderás mucho y disfrutarás de un vínculo de por vida con el fitness y el ejercicio de boxeo.",
    },
    {
      descripcion:
        "Te enseñaremos todos los fundamentos básicos del boxeo desde el principio, lo que te permitirá construir una base sólida desde el principio.",
    },
    {
      descripcion:
        "Te enseñaremos las técnicas de boxeo adecuadas como se enseñan a boxeadores aficionados y profesionales.",
    },
  ];

  return (
    <>
      <section className="">
        <TitleComponent
          title={data.price.title}
          description={data.price.description}
        />
      </section>
      <section>
        <div className="card__container">
          <Cards />
        </div>
        <div className="price__description">
          {descriptionPrice.map((descripcion, index) => (
            <p key={index}>
              <span>&#10003;</span> {descripcion.descripcion}
            </p>
          ))}
        </div>
      </section>
    </>
  );
};

export default Price;
