import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose, IoTrashOutline } from 'react-icons/io5';
import './CartDrawer.css';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import { api } from '../../lib/api';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartReducer';
import { closeCartDrawer, selectCartDrawerOpen } from '../../redux/slices/uiReducer';

const THRESHOLD = api.getFreeShippingThreshold();

export default function CartDrawer() {
  const dispatch = useDispatch();
  const open = useSelector(selectCartDrawerOpen);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const panelRef = useRef(null);
  const close = () => dispatch(closeCartDrawer());

  // Escape closes, and the body stops scrolling behind the panel.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') dispatch(closeCartDrawer());
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, dispatch]);

  if (!open) return null;

  const remaining = Math.max(0, THRESHOLD - total);
  const progress = Math.min(100, (total / THRESHOLD) * 100);

  return (
    <div className="drawer-root">
      <div className="drawer-scrim" onClick={close} role="presentation" />

      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        tabIndex={-1}
        ref={panelRef}
      >
        <header className="drawer__header">
          <h2>Your cart {items.length > 0 && <span>({items.length})</span>}</h2>
          <button type="button" className="link-button" onClick={close} aria-label="Close cart">
            <IoClose />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="button-primary" onClick={close}>
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer__shipping">
              {remaining > 0 ? (
                <p>
                  <strong>{formatMoney(remaining)}</strong> away from free shipping
                </p>
              ) : (
                <p className="is-met">You&rsquo;ve earned free shipping</p>
              )}
              <div
                className="progress"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="progress__fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="drawer__items">
              {items.map((item) => (
                <li key={item.Product_id} className="drawer-item">
                  <Link to={`/product/${item.Product_id}`} onClick={close}>
                    <img
                      src={item.Product_image}
                      alt={item.Product_name}
                      onError={onImageError}
                    />
                  </Link>

                  <div className="drawer-item__body">
                    <Link
                      to={`/product/${item.Product_id}`}
                      className="drawer-item__name"
                      onClick={close}
                    >
                      {item.Product_name}
                    </Link>
                    <p className="drawer-item__price">{formatMoney(item.Product_price)}</p>

                    <div className="drawer-item__controls">
                      <div className="stepper-inline">
                        <button
                          type="button"
                          onClick={() => dispatch(decrementQuantity(item.Product_id))}
                          aria-label={`Remove one ${item.Product_name}`}
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          type="button"
                          disabled={item.quantity >= item.Quantity}
                          onClick={() => dispatch(incrementQuantity(item.Product_id))}
                          aria-label={`Add one ${item.Product_name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="link-button danger"
                        onClick={() => dispatch(removeItem(item.Product_id))}
                        aria-label={`Remove ${item.Product_name}`}
                      >
                        <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer__footer">
              <p className="drawer__subtotal">
                <span>Subtotal</span>
                <strong>{formatMoney(total)}</strong>
              </p>
              <p className="drawer__note">Shipping and taxes calculated at checkout.</p>
              <Link to="/checkout" className="button-primary" onClick={close}>
                Checkout
              </Link>
              <Link to="/cart" className="button-secondary" onClick={close}>
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
