import { api } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { Spinner, ErrorMessage } from '../../common/Status';

const money = (value) => `$${Math.round(value).toLocaleString()}`;

const Dashboard = () => {
  // The old dashboard hardcoded "2000" in all three cards.
  const { data: stats, status, error, reload } = useAsync(() => api.getStats(), [], {
    fallbackError: 'Could not load dashboard figures.',
  });

  if (status === 'loading') return <Spinner label="Loading dashboard…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;

  const cards = [
    { key: 'orders', title: 'Orders placed', value: stats.orders.toLocaleString() },
    { key: 'revenue', title: 'Revenue', value: money(stats.revenue) },
    { key: 'products', title: 'Products listed', value: stats.products.toLocaleString() },
    { key: 'inventory', title: 'Inventory value', value: money(stats.inventoryValue) },
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
    </div>
  );
};

export default Dashboard;
