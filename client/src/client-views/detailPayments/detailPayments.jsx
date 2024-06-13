import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetailPayments } from "../../redux/paymentsActions.js";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./detailPayment.module.css";
import axios from "axios";

const DetailPayments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const paymentsDetail = useSelector((state) => state.payments.paymentsDetail);

  const pay = async (paymentId, unitPrice) => {
    try {
      if (!isAuthenticated) {
        loginWithRedirect();
        return;
      }
      const response = await axios.post(
        `/mercadoPago/create-preference:${user.email}`,
        {
          paymentId,
          price: unitPrice,
        }
      );

      if (
        response.data &&
        response.data.body &&
        response.data.body.init_point
      ) {
        window.location.href = response.data.body.init_point;
      } else {
        console.error(
          "La respuesta del servidor no tiene el formato esperado:",
          response
        );
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchDetailPayments(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className={style.card}>
        <h1>{paymentsDetail.name}</h1>
        <p>{paymentsDetail.id}</p>
        <div>
          <button
            onClick={() => pay(paymentsDetail.id, paymentsDetail.price)}
            className={style.button}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPayments;
