import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const OrderStatus = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('payment_id');

    if (paymentId) {
      // Envía el paymentId al backend
      api.post(`/mercadoPago/order-update/${paymentId}`)
        .then(response => {
          console.log('Payment Data:', response.data);
        })
        .catch(error => {
          console.error('Error fetching payment data:', error);
        });
    }
  }, [location.search]);

  return (
    <h1>Order Status</h1>
  );
};

export default OrderStatus;
