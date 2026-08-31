import { createSlice } from '@reduxjs/toolkit';
import { tokenStore } from '../../lib/api';

// One slice for both shopper and admin sessions — the old code kept a separate
// `admin` slice whose `loggedIn` flag nothing ever checked.
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, role: null, status: 'idle', error: null },
  reducers: {
    authLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    authSucceeded: (state, { payload }) => {
      state.user = payload.user ?? { email: payload.email };
      state.token = payload.token ?? null;
      state.role = payload.role ?? payload.user?.User_role ?? 'User';
      state.status = 'succeeded';
      state.error = null;
      tokenStore.set(state.token);
    },
    authFailed: (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = 'idle';
      state.error = null;
      tokenStore.set(null);
    },
  },
});

export const { authLoading, authSucceeded, authFailed, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
export const selectIsAdmin = (state) => state.auth.role === 'Admin';
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
