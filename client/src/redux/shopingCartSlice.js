import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const shopingCartSlice = createSlice({
  name: "shopingCart",
  initialState: {
    pendingOrder: {},
    itemsOrder: [],
    isChecked: false,
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
      // Check if an item with the same PaymentId already exists in pendingOrder.Items
      const existingItem = state.pendingOrder.Items.find(
        (it) => it.PaymentId === newItem.PaymentId
      );
      if (!existingItem) {
        // Add the new item only if it doesn't already exist in the order
        state.itemsOrder = [...state.itemsOrder, newItem];
        if (state.pendingOrder.Items) {
          state.pendingOrder.Items = [...state.pendingOrder.Items, newItem];
        } else {
          state.pendingOrder.Items = [newItem];
        }
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
          it.quantity = quantity;
          it.amount = amount;
        }
        return it;
      });
      state.pendingOrder.Items = state.pendingOrder.Items.map((it) => {
        if (it.id === itemId) {
          it.quantity = quantity;
          it.amount = amount;
        }
        return it;
      });
    },
    setCheckboxState: (state, action) => {
      state.isChecked = action.payload;
    },
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
} = shopingCartSlice.actions;

export default shopingCartSlice.reducer;

export const getPendingOrderAction = (userId) => async (dispatch) => {
  try {
    const pendingOrder = await api
      .get(`/order/${userId}`)
      .then((r) => r.data[0]);
    dispatch(getPendingOrderCase(pendingOrder));
  } catch (error) {
    console.log(error);
  }
};

export const setItemsActions =
  ({ Payments, PaymentsId, OrderId, final_price, quantity, amount }) =>
  async (dispatch) => {
    try {
      const item = await api
        .post("/item", {
          PaymentsId: PaymentsId,
          OrderId: OrderId,
          final_price: final_price,
          quantity: quantity,
          amount: amount,
        })
        .then((r) => r.data);
      dispatch(setItems({ Payments: Payments, ...item }));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteItemActions =
  ({ id, OrderId }) =>
  async (dispatch) => {
    try {
      await api.delete(`/item/${id}`, { data: { OrderId } });
      dispatch(deleteItems(id));
    } catch (error) {
      console.log(error);
    }
  };

export const putItemActions =
  ({ orderId, itemId, quantity, amount }) =>
  async (dispatch) => {
    try {
      await api.put("/item", {
        orderId,
        itemId,
        quantity,
        amount,
      });
      dispatch(putItems({ itemId, quantity, amount }));
    } catch (error) {
      console.log(error);
    }
  };
