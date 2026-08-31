import { createSlice } from '@reduxjs/toolkit';

// Purely presentational state that several components need to agree on.
const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartDrawerOpen: false },
  reducers: {
    openCartDrawer: (state) => {
      state.cartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
  },
});

export const { openCartDrawer, closeCartDrawer } = uiSlice.actions;
export const selectCartDrawerOpen = (state) => state.ui.cartDrawerOpen;
export default uiSlice.reducer;
