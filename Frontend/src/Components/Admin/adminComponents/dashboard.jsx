import { Link } from 'react-router-dom';
import { api } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { formatMoney, formatDate } from '../../../lib/format';
import { Spinner, ErrorMessage, Empty } from '../../common/Status';

const Dashboard = () => {
  // The old dashboard hardcoded "2000" in all three cards.
  const { data: stats, status, error, reload } = useAsync(() => api.getStats(), [], {
    fallbackError: 'Could not load dashboard figures.',
  });
  const { data: orders } = useAsync(() => api.getRecentOrders(5), [], { initialData: [] });

  if (status === 'loading') return <Spinner label="Loading dashboard…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;

  const cards = [
    { key: 'orders', title: 'Orders placed', value: stats.orders.toLocaleString() },
    { key: 'revenue', title: 'Revenue', value: formatMoney(stats.revenue) },
    { key: 'products', title: 'Products listed', value: stats.products.toLocaleString() },
    { key: 'inventory', title: 'Inventory value', value: formatMoney(stats.inventoryValue) },
  ];

  return (
    <div className="dashboard">
      <div className="title">
        <p>DASHBOARD</p>
      </div>

      <div className="flashcards">
        {cards.map((card, index) => (
          <div key={card.key} className={`flashcard flashcard${index + 1}`}>
            <div className="text">
              <p className="flashcardTitle">{card.title}</p>
              <p className="number">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <div className="admin-alerts">
          {stats.outOfStock > 0 && (
            <p className="admin-alert admin-alert--warn">
              <strong>{stats.outOfStock}</strong> product
              {stats.outOfStock === 1 ? ' is' : 's are'} out of stock.{' '}
              <Link to="/admin/updateProduct">Restock</Link>
            </p>
          )}
          {stats.lowStock > 0 && (
            <p className="admin-alert">
              <strong>{stats.lowStock}</strong> product
              {stats.lowStock === 1 ? ' has' : 's have'} five or fewer units left.
            </p>
          )}
        </div>
      )}

      <section className="admin-panel">
        <h2>Recent orders</h2>
        {orders.length === 0 ? (
          <Empty message="No orders yet." />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Placed</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatDate(order.placedAt)}</td>
                    <td>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                    <td>{order.status}</td>
                    <td>{formatMoney(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
