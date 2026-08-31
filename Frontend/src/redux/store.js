import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartReducer';
import authReducer from './slices/authReducer';
import wishlistReducer from './slices/wishlistReducer';
import uiReducer from './slices/uiReducer';
import { loadState, saveState, throttle } from './persist';

// Redux now holds only client state — the cart and the session. Server data
// (products, users) is fetched per screen through `lib/api` + `useAsync`, which
// keeps it fresh instead of letting a stale copy sit in the store.
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
  preloadedState: loadState(),
});

const persist = throttle(() => saveState(store.getState()));
store.subscribe(persist);

// `pagehide` is the reliable last-chance hook on mobile Safari, where
// `beforeunload` often never fires.
if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => persist.flush());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') persist.flush();
  });
}

export default store;
