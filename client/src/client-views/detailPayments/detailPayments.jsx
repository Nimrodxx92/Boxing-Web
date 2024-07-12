import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetailPayments } from "../../redux/paymentsActions.js";
import style from "./detailPayment.module.css";
import {
  setItemsActions,
  getPendingOrderAction,
  setCheckboxState,
} from "../../redux/shopingCartSlice";
import api from "../../api.js";

const DetailPayments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const paymentsDetail = useSelector((state) => state.payments.paymentsDetail);
  const isChecked = useSelector((state) => state.shopingCartReducer.isChecked);
  const pendingOrder = useSelector((state) => state.shopingCartReducer.pendingOrder);
  const localUser = useSelector((state) => state.user.user);
  const allItems = useSelector((state) => state.shopingCartReducer.itemsOrder);
  const isLocalAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const emailLocalUser = useSelector((state) => state.user?.user?.email);

  useEffect(() => {
    dispatch(fetchDetailPayments(id));
    if (localUser) {
      dispatch(getPendingOrderAction(localUser.id));
    }
  }, [dispatch, id, localUser]);

  useEffect(() => {
    if (isLocalAuthenticated && !allItems.length && emailLocalUser) {
      api.post("/order", { email: emailLocalUser })
        .then((response) => {
          console.log("Order created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating order:", error.response ? error.response.data : error.message);
        });
    }
  }, [isLocalAuthenticated, allItems.length, emailLocalUser]);
  

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    dispatch(setCheckboxState(checked));
  
    if (checked && pendingOrder.id) {
      const itemExists = allItems.some((item) => item.PaymentId === paymentsDetail.id);
      if (!itemExists) {
        console.log("Sending data to setItemsActions:", {
          Payments: paymentsDetail,
          PaymentId: paymentsDetail.id,
          OrderId: pendingOrder.id,
          final_price: paymentsDetail.price,
          quantity: paymentsDetail.quantity,
          amount: paymentsDetail.price,
        });
        dispatch(
          setItemsActions({
            Payments: paymentsDetail,
            PaymentId: paymentsDetail.id,
            OrderId: pendingOrder.id,
            final_price: paymentsDetail.price,
            quantity: paymentsDetail.quantity,
            amount: paymentsDetail.price,
          })
        );
      }
    }
  };

  return (
    <div>
      <div className={style.card}>
        <h1>{paymentsDetail.name}</h1>
        <p>{paymentsDetail.id}</p>
        <div>
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="terms">Aceptar términos y condiciones</label>
        </div>
        <div>
          <button
            className={`${style.button} ${isChecked ? style.blackButton : ""}`}
            disabled={!isChecked}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPayments;
