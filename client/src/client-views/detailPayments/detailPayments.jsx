  import { useParams } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { useEffect } from "react";
  import { fetchDetailPayments } from "../../redux/paymentsActions.js";
  import style from "./detailPayment.module.css";
  import {
    setItemsActions,
    getPendingOrderAction,
    setCheckboxState,
    createMercadoPagoPreferenceAction,
    setPayments
  } from "../../redux/shopingCartSlice";
  import api from "../../api.js";
  
  const DetailPayments = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const paymentsDetail = useSelector((state) => state.payments.paymentsDetail);
    const isChecked = useSelector((state) => state.shopingCartReducer.isChecked);
    const pendingOrder = useSelector((state) => state.shopingCartReducer.pendingOrder);
    const allItems = useSelector((state) => state.shopingCartReducer.itemsOrder);
    const localUser = useSelector((state) => state.user.user);
    const emailLocalUser = useSelector((state) => state.user?.user?.email);
    const allPayments = useSelector((state) => state.shopingCartReducer.payments.allPayments);

  
    useEffect(() => {
      dispatch(fetchDetailPayments(id));
      if (localUser) {
        dispatch(getPendingOrderAction(localUser.id));
      }
    }, [dispatch, id, localUser]);
  
    useEffect(() => {
      if (!allPayments.length) {
        api.get("/payments")
          .then((response) => {
            dispatch(setPayments({ allPayments: response.data }));
          })
          .catch((error) => {
            console.error("Error fetching payments:", error);
          });
      }
    }, [dispatch, allPayments.length]);
  
    const handleCheckboxChange = (event) => {
      const checked = event.target.checked;
      dispatch(setCheckboxState(checked));
    
      if (checked && pendingOrder.id) {
        const itemExists = allItems.some((item) => item.PaymentId === paymentsDetail.id);
        if (!itemExists) {
          dispatch(
            setItemsActions({
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
  
    const handlePayClick = async () => {
      if (isChecked && emailLocalUser) {
        try {
          const checkoutUrl = await dispatch(createMercadoPagoPreferenceAction(emailLocalUser, allItems));
          // Redirige al usuario a la URL de MercadoPago
          if (checkoutUrl) {
            window.location.href = checkoutUrl;
          } else {
            console.error('No se ha recibido la URL de MercadoPago');
          }
        } catch (error) {
          console.error('Error al crear la preferencia de MercadoPago:', error);
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
              onClick={handlePayClick}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DetailPayments;
  