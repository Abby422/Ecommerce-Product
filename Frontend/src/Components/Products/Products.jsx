import { useState } from 'react';
import './Products.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import Product from '../Product/Product';
import { Spinner, ErrorMessage, Empty } from '../common/Status';

const PAGE_SIZE = 8;

function Products() {
  const [page, setPage] = useState(1);
  const { data, status, error, reload } = useAsync(
    () => api.getProducts({ pageNumber: page, rowNumber: PAGE_SIZE }),
    [page],
    { initialData: { items: [], total: 0 }, fallbackError: 'Could not load products.' },
  );

  const products = data?.items ?? [];
  const pageCount = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));

  return (
    <section className="products_container" id="shop">
      <h2>SHOP</h2>

      {status === 'loading' && <Spinner label="Loading products…" />}
      {status === 'failed' && <ErrorMessage message={error} onRetry={reload} />}
      {status === 'succeeded' && products.length === 0 && (
        <Empty message="No products to show yet." />
      )}

      {status === 'succeeded' && products.length > 0 && (
        <>
          <div className="products">
            {products.map((product) => (
              <Product key={product.Product_id} product={product} />
            ))}
          </div>

          {pageCount > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="call-to-action-button"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <span>
                Page {page} of {pageCount}
              </span>
              <button
                type="button"
                className="call-to-action-button"
                disabled={page >= pageCount}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Products;
