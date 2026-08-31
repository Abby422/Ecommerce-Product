import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteSweep } from 'react-icons/md';
import './Cart.css';
import { api, errorMessage } from '../../lib/api';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from '../../redux/slices/cartReducer';
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authReducer';
import { ErrorMessage } from '../common/Status';
import { onImageError } from '../../lib/placeholder';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    setStatus('submitting');
    setError(null);
    try {
      // The old Checkout button had no handler at all — the backend /checkout
      // route was never called from anywhere.
      await api.checkout({
        UserId: user?.User_Id ?? user?.email ?? null,
        quantity: items.reduce((sum, item) => sum + item.quantity, 0),
        total,
        ProductId: items.map((item) => item.Product_id).join(','),
      });
      dispatch(clearCart());
      setStatus('done');
    } catch (err) {
      setError(errorMessage(err, 'Checkout failed. Please try again.'));
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="Cart cart-empty">
        <h5>Thanks — your order is in.</h5>
        <Link to="/" className="call-to-action-button">
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="Cart cart-empty">
        <h5>Your cart is empty</h5>
        <Link to="/" className="call-to-action-button">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="Cart">
      <div className="cart-table">
        <div className="table-header">
          <h5>Product</h5>
          <h5>Name</h5>
          <h5>Quantity</h5>
          <h5>Price</h5>
          <h5>Total</h5>
          <h5><span className="visually-hidden">Remove</span></h5>
        </div>

        {items.map((product) => (
          <div className="product-row" key={product.Product_id}>
            <img src={product.Product_image} alt={product.Product_name} onError={onImageError} />
            <p>{product.Product_name}</p>

            <div className="quantity-count">
              <button
                type="button"
                className="countbutton"
                onClick={() => dispatch(decrementQuantity(product.Product_id))}
                aria-label={`Remove one ${product.Product_name}`}
              >
                −
              </button>
              <span aria-live="polite">{product.quantity}</span>
              <button
                type="button"
                className="countbutton"
                disabled={product.quantity >= product.Quantity}
                onClick={() => dispatch(incrementQuantity(product.Product_id))}
                aria-label={`Add one ${product.Product_name}`}
              >
                +
              </button>
            </div>

            <p>${product.Product_price.toLocaleString()}</p>
            <p>${(product.Product_price * product.quantity).toLocaleString()}</p>

            <button
              type="button"
              className="link-button"
              onClick={() => dispatch(removeItem(product.Product_id))}
              aria-label={`Remove ${product.Product_name} from cart`}
            >
              <MdDeleteSweep />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p className="cart-total">
          Total: <strong>${total.toLocaleString()}</strong>
        </p>
        {error && <ErrorMessage message={error} />}
        <button
          type="button"
          className="call-to-action-button"
          onClick={handleCheckout}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Placing order…' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}

export default Cart;
