import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IoCheckmarkCircle, IoAlertCircle, IoClose } from 'react-icons/io5';
import './Toast.css';
import { ToastContext } from './toastContext';

let nextId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (toast) => {
      const id = ++nextId;
      setToasts((current) => [...current.slice(-2), { id, ...toast }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), toast.duration ?? 3500),
      );
      return id;
    },
    [dismiss],
  );

  // Clear every pending timer if the provider ever unmounts.
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      toast: (message, options) => push({ message, ...options }),
      success: (message, options) => push({ message, tone: 'success', ...options }),
      error: (message, options) => push({ message, tone: 'error', duration: 5000, ...options }),
      dismiss,
    }),
    [push, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.tone ?? 'neutral'}`}>
            <span className="toast__icon">
              {t.tone === 'error' ? <IoAlertCircle /> : <IoCheckmarkCircle />}
            </span>
            <div className="toast__body">
              <p className="toast__message">{t.message}</p>
              {t.detail && <p className="toast__detail">{t.detail}</p>}
            </div>
            {t.action && (
              <button
                type="button"
                className="toast__action"
                onClick={() => {
                  t.action.onClick();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            <button
              type="button"
              className="toast__close"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <IoClose />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
