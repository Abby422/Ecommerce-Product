import { useSearchParams } from 'react-router-dom';
import './Search.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import Product from '../Product/Product';
import { Spinner, ErrorMessage, Empty } from '../common/Status';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data: results, status, error, reload } = useAsync(
    () => (query ? api.searchProducts(query) : []),
    [query],
    { initialData: [], fallbackError: 'Search failed.' },
  );

  return (
    <section className="products_container">
      <h2>{query ? `Results for “${query}”` : 'Search'}</h2>

      {status === 'loading' && <Spinner label="Searching…" />}
      {status === 'failed' && <ErrorMessage message={error} onRetry={reload} />}
      {status === 'succeeded' && results.length === 0 && (
        <Empty
          message={query ? `Nothing matched “${query}”.` : 'Type something in the search box above.'}
        />
      )}

      <div className="products">
        {results.map((product) => (
          <Product key={product.Product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Search;
