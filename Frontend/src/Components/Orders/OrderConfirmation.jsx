import { Link, useParams, useLocation } from 'react-router-dom';
import { IoCheckmarkCircle } from 'react-icons/io5';
import './Orders.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { formatMoney, formatDate } from '../../lib/format';
import { Spinner, ErrorMessage, Empty } from '../common/Status';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  const { data: order, status, error, reload } = useAsync(() => api.getOrder(orderId), [orderId], {
    fallbackError: 'Could not load that order.',
  });

  if (status === 'loading') return <Spinner label="Loading your order…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;
  if (!order) {
    return (
      <div className="order-page">
        <Empty message="We couldn’t find that order." />
        <Link to="/shop" className="button-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="order-page">
      {justPlaced && (
        <div className="order-hero">
          <IoCheckmarkCircle />
          <h1>Thank you — your order is confirmed</h1>
          <p>
            We&rsquo;ve sent a confirmation to <strong>{order.address?.email}</strong>. Your order
            number is <strong>{order.id}</strong>.
          </p>
        </div>
      )}

      {!justPlaced && (
        <header className="order-page__header">
          <h1>Order {order.id}</h1>
          <p>
            Placed {formatDate(order.placedAt)} · <span className="status-pill">{order.status}</span>
          </p>
        </header>
      )}

      <div className="order-grid">
        <section className="panel">
          <h2>Items</h2>
          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.Product_id}>
                <Link to={`/product/${item.Product_id}`}>{item.Product_name}</Link>
                <span className="order-items__qty">× {item.quantity}</span>
                <span>{formatMoney(item.Product_price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <dl className="totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatMoney(order.subtotal)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{order.shipping === 0 ? 'Free' : formatMoney(order.shipping)}</dd>
            </div>
            {order.discount > 0 && (
              <div className="totals__discount">
                <dt>Discount</dt>
                <dd>−{formatMoney(order.discount)}</dd>
              </div>
            )}
            <div className="totals__grand">
              <dt>Total</dt>
              <dd>{formatMoney(order.total)}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <h2>Delivery</h2>
          {order.address ? (
            <address className="order-address">
              {order.address.fullName}
              <br />
              {order.address.line1}
              {order.address.line2 && (
                <>
                  <br />
                  {order.address.line2}
                </>
              )}
              <br />
              {order.address.city} {order.address.postcode}
              <br />
              {order.address.country}
            </address>
          ) : (
            <p className="order-address">No address on file for this order.</p>
          )}
          <p className="order-method">
            <strong>Method:</strong> {order.shippingMethod ?? 'Standard'}
          </p>
          <p className="order-method">
            <strong>Status:</strong> <span className="status-pill">{order.status}</span>
          </p>
        </section>
      </div>

      <div className="order-page__actions">
        <Link to="/shop" className="button-primary">
          Continue shopping
        </Link>
        <Link to="/account" className="button-secondary">
          View all orders
        </Link>
      </div>
    </div>
  );
}
