import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoTrashOutline, IoHeartOutline } from 'react-icons/io5';
import './Cart.css';
import { api } from '../../lib/api';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import Breadcrumbs from '../common/Breadcrumbs';
import { useToast } from '../common/toastContext';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  addItem,
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartReducer';
import { toggleWish } from '../../redux/slices/wishlistReducer';

const THRESHOLD = api.getFreeShippingThreshold();

function Cart() {
  const dispatch = useDispatch();
  const toast = useToast();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="Cart cart-empty">
        <h1>Your cart is empty</h1>
        <p>Nothing here yet — have a look around.</p>
        <Link to="/shop" className="button-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  const remaining = Math.max(0, THRESHOLD - total);

  // Removing is undoable rather than instant-and-final.
  const handleRemove = (item) => {
    dispatch(removeItem(item.Product_id));
    toast.toast(`${item.Product_name} removed`, {
      action: {
        label: 'Undo',
        onClick: () => {
          for (let i = 0; i < item.quantity; i += 1) dispatch(addItem(item));
        },
      },
    });
  };

  const handleSaveForLater = (item) => {
    dispatch(toggleWish(item.Product_id));
    dispatch(removeItem(item.Product_id));
    toast.success(`${item.Product_name} moved to your wishlist`);
  };

  return (
    <div className="Cart">
      <Breadcrumbs trail={[{ to: '/', label: 'Home' }, { label: 'Cart' }]} />
      <h1>Your cart</h1>

      <div className="cart-layout">
        <div className="cart-table">
          <div className="table-header">
            <span>Product</span>
            <span />
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
            <span className="visually-hidden">Actions</span>
          </div>

          {items.map((item) => (
            <div className="product-row" key={item.Product_id}>
              <Link to={`/product/${item.Product_id}`} className="product-row__image">
                <img src={item.Product_image} alt={item.Product_name} onError={onImageError} />
              </Link>

              <div className="product-row__info">
                <Link to={`/product/${item.Product_id}`}>{item.Product_name}</Link>
                {item.quantity >= item.Quantity && (
                  <p className="stock-warning">Maximum available</p>
                )}
                <div className="product-row__links">
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => handleSaveForLater(item)}
                  >
                    <IoHeartOutline /> Save for later
                  </button>
                </div>
              </div>

              <div className="quantity-count">
                <button
                  type="button"
                  className="countbutton"
                  onClick={() => dispatch(decrementQuantity(item.Product_id))}
                  aria-label={`Remove one ${item.Product_name}`}
                >
                  −
                </button>
                <span aria-live="polite">{item.quantity}</span>
                <button
                  type="button"
                  className="countbutton"
                  disabled={item.quantity >= item.Quantity}
                  onClick={() => dispatch(incrementQuantity(item.Product_id))}
                  aria-label={`Add one ${item.Product_name}`}
                >
                  +
                </button>
              </div>

              <p className="product-row__price">{formatMoney(item.Product_price)}</p>
              <p className="product-row__total">
                {formatMoney(item.Product_price * item.quantity)}
              </p>

              <button
                type="button"
                className="link-button danger"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.Product_name} from cart`}
              >
                <IoTrashOutline />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Summary</h2>

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{remaining === 0 ? 'Free' : 'Calculated at checkout'}</dd>
            </div>
            <div className="totals__grand">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>

          {remaining > 0 ? (
            <p className="summary-note">
              Spend <strong>{formatMoney(remaining)}</strong> more for free standard shipping.
            </p>
          ) : (
            <p className="summary-note is-met">You&rsquo;ve earned free standard shipping.</p>
          )}

          <Link to="/checkout" className="button-primary">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="button-secondary">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
