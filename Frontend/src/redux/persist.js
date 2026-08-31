// Minimal state persistence. redux-persist would be a heavier dependency than
// this app needs — two slices, one key, no migrations.

const KEY = 'spacejoy.state.v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(
      KEY,
      // `status` and `error` are per-attempt UI state; rehydrating a stale
      // "loading" would leave the sign-in button disabled on load.
      JSON.stringify({ cart: state.cart, auth: { ...state.auth, status: 'idle', error: null } }),
    );
  } catch {
    // Quota exceeded or storage blocked — the session just will not survive a reload.
  }
}

// Writes on the leading edge and again at the end of the window. A purely
// trailing throttle loses anything changed in the last `ms` before the tab is
// closed or the page is reloaded, which is exactly when a cart is at risk.
export function throttle(fn, ms = 500) {
  let timer = null;
  let pending = false;

  const throttled = (...args) => {
    if (timer) {
      pending = true;
      return;
    }
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
      if (pending) {
        pending = false;
        throttled(...args);
      }
    }, ms);
  };

  throttled.flush = (...args) => {
    if (timer) clearTimeout(timer);
    timer = null;
    pending = false;
    fn(...args);
  };

  return throttled;
}
