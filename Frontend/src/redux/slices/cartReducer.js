import { createSlice } from '@reduxjs/toolkit';

const findItem = (items, id) => items.find((item) => item.Product_id === id);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    // Adding a product already in the cart bumps its quantity instead of
    // pushing a duplicate row.
    addItem: (state, { payload }) => {
      const existing = findItem(state.items, payload.Product_id);
      if (existing) {
        if (existing.quantity < payload.Quantity) existing.quantity += 1;
        return;
      }
      state.items.push({ ...payload, quantity: 1 });
    },

    incrementQuantity: (state, { payload }) => {
      const item = findItem(state.items, payload);
      // Never let the cart promise more units than the shop has.
      if (item && item.quantity < item.Quantity) item.quantity += 1;
    },

    // Stepping below one removes the row, rather than leaving a 0- or
    // negative-quantity item in the cart as the old reducer did.
    decrementQuantity: (state, { payload }) => {
      const item = findItem(state.items, payload);
      if (!item) return;
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.Product_id !== payload);
        return;
      }
      item.quantity -= 1;
    },

    removeItem: (state, { payload }) => {
      state.items = state.items.filter((item) => item.Product_id !== payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, incrementQuantity, decrementQuantity, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.Product_price * item.quantity, 0);
export const selectCartItem = (id) => (state) => findItem(state.cart.items, id);

export default cartSlice.reducer;
