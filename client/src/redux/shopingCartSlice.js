import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const shopingCartSlice = createSlice({
  name: "shopingCart",
  initialState: {
    pendingOrder: {
      id: null,
      total_price: null,
      payment_date: null,
      status: null,
      payment_status_detail: null,
      payment_id: null,
      createdAt: null,
      updatedAt: null,
      UserId: null,
      Items: []
    },
    itemsOrder: [],
    isChecked: false,
    mercadoPagoPreference: null,
    payments: {
      allPayments: [],
      paymentsDetail: {}
    }
  },
  reducers: {
    getPendingOrderCase: (state, action) => {
      state.pendingOrder = action.payload;
    },
    setUserOrderCase: (state, action) => {
      state.pendingOrder = action.payload;
    },
    setItems: (state, action) => {
      const newItem = action.payload;

      // Find payment details corresponding to the new item
      const paymentDetail = state.payments.allPayments.find(
        (payment) => payment.id === newItem.PaymentId
      );

      if (!paymentDetail) {
        console.error("Payment detail not found for item:", newItem);
        return;
      }

      // Check if an item with the same PaymentId already exists in itemsOrder
      const existingItem = state.itemsOrder.find(
        (it) => it.PaymentId === newItem.PaymentId
      );

      if (!existingItem) {
        // Add the new item only if it doesn't already exist in the order
        state.itemsOrder = [...state.itemsOrder, { ...newItem, payments: paymentDetail }];
        state.pendingOrder.Items = [...state.pendingOrder.Items, { ...newItem, payments: paymentDetail }];
      }
    },
    getItems: (state, action) => {
      state.itemsOrder = action.payload;
    },
    deleteItems: (state, action) => {
      const deleteId = action.payload;
      state.itemsOrder = state.itemsOrder.filter((it) => it.id !== deleteId);
      state.pendingOrder.Items = state.pendingOrder.Items.filter(
        (it) => it.id !== deleteId
      );
    },
    putItems: (state, action) => {
      const { itemId, quantity, amount } = action.payload;
      state.itemsOrder = state.itemsOrder.map((it) => {
        if (it.id === itemId) {
          return { ...it, quantity, amount };
        }
        return it;
      });
      state.pendingOrder.Items = state.pendingOrder.Items.map((it) => {
        if (it.id === itemId) {
          return { ...it, quantity, amount };
        }
        return it;
      });
    },
    setCheckboxState: (state, action) => {
      state.isChecked = action.payload;
    },
    setMercadoPagoPreference: (state, action) => {
      state.mercadoPagoPreference = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    }
  },
});

export const {
  getPendingOrderCase,
  setUserOrderCase,
  setItems,
  getItems,
  putItems,
  deleteItems,
  setCheckboxState,
  setMercadoPagoPreference,
  setPayments
} = shopingCartSlice.actions;

export default shopingCartSlice.reducer;

// Action Creators
export const getPendingOrderAction = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/order/${userId}`);
    dispatch(getPendingOrderCase(response.data[0]));
  } catch (error) {
    console.log(error);
  }
};

export const setItemsActions = (items) => async (dispatch) => {
  try {
    const response = await api.post("/item", items);
    dispatch(setItems(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemActions = ({ id, OrderId }) => async (dispatch) => {
  try {
    await api.delete(`/item/${id}`, { data: { OrderId } });
    dispatch(deleteItems(id));
  } catch (error) {
    console.log(error);
  }
};

export const putItemActions = ({ orderId, itemId, quantity, amount }) => async (dispatch) => {
  try {
    await api.put("/item", { orderId, itemId, quantity, amount });
    dispatch(putItems({ itemId, quantity, amount }));
  } catch (error) {
    console.log(error);
  }
};

// redux/shopingCartSlice.js
export const createMercadoPagoPreferenceAction = (userEmail, itemsOrder) => async (dispatch) => {
  try {
    const data = itemsOrder.map(item => ({
      PaymentId: item.PaymentId,
      OrderId: item.OrderId,
      final_price: item.final_price,
      quantity: item.quantity,
      amount: item.amount,
      Payment: item.items, 
      title: item.payments.name
    }));

    const response = await api.post(`mercadoPago/create-preference/${userEmail}`, data);
    console.log("respuesta de mercado pago=>", response.data.checkoutUrl);

    dispatch(setMercadoPagoPreference(response.data));
    return response.data.checkoutUrl; // Asegúrate de retornar la URL
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
