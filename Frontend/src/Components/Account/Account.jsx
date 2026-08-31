import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Account.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { formatMoney, formatDate } from '../../lib/format';
import { logout, selectUser } from '../../redux/slices/authReducer';
import { selectWishlistCount } from '../../redux/slices/wishlistReducer';
import { Spinner, Empty } from '../common/Status';
import Breadcrumbs from '../common/Breadcrumbs';

export default function Account() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const wishCount = useSelector(selectWishlistCount);

  const { data: orders, status } = useAsync(() => api.getOrders(user?.User_Id), [user?.User_Id], {
    initialData: [],
  });

  return (
    <div className="account">
      <Breadcrumbs trail={[{ to: '/', label: 'Home' }, { label: 'Account' }]} />

      <header className="account__header">
        <div>
          <h1>{user?.Name ?? user?.userName ?? 'Your account'}</h1>
          <p>{user?.Email ?? user?.email}</p>
        </div>
        <button type="button" className="button-secondary" onClick={() => dispatch(logout())}>
          Sign out
        </button>
      </header>

      <div className="account__cards">
        <div className="account-card">
          <p className="account-card__label">Orders</p>
          <p className="account-card__value">{orders.length}</p>
        </div>
        <div className="account-card">
          <p className="account-card__label">Saved items</p>
          <p className="account-card__value">{wishCount}</p>
          <Link to="/wishlist" className="secondary-link">
            View wishlist
          </Link>
        </div>
        {user?.User_role === 'Admin' && (
          <div className="account-card">
            <p className="account-card__label">Role</p>
            <p className="account-card__value">Admin</p>
            <Link to="/admin" className="secondary-link">
              Open dashboard
            </Link>
          </div>
        )}
      </div>

      <section className="account__orders">
        <h2>Order history</h2>

        {status === 'loading' && <Spinner label="Loading orders…" />}

        {status === 'succeeded' && orders.length === 0 && (
          <div className="account__empty">
            <Empty message="You haven’t placed an order yet." />
            <Link to="/shop" className="button-primary">
              Start shopping
            </Link>
          </div>
        )}

        {orders.length > 0 && (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order.id} className="order-row">
                <div>
                  <Link to={`/order/${order.id}`} className="order-row__id">
                    {order.id}
                  </Link>
                  <p className="order-row__meta">
                    {formatDate(order.placedAt)} · {order.items.length} item
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                </div>
                <span className="status-pill">{order.status}</span>
                <span className="order-row__total">{formatMoney(order.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
