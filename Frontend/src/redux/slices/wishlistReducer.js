import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: [] },
  reducers: {
    toggleWish: (state, { payload }) => {
      const id = Number(payload);
      state.ids = state.ids.includes(id)
        ? state.ids.filter((existing) => existing !== id)
        : [id, ...state.ids];
    },
    removeWish: (state, { payload }) => {
      state.ids = state.ids.filter((existing) => existing !== Number(payload));
    },
  },
});

export const { toggleWish, removeWish } = wishlistSlice.actions;

export const selectWishlistIds = (state) => state.wishlist.ids;
export const selectWishlistCount = (state) => state.wishlist.ids.length;
export const selectIsWished = (id) => (state) => state.wishlist.ids.includes(Number(id));

export default wishlistSlice.reducer;
