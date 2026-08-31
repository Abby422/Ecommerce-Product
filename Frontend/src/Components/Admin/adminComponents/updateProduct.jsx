import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { api } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { onImageError } from '../../../lib/placeholder';
import { Spinner, ErrorMessage, Empty } from '../../common/Status';

const UpdateProduct = () => {
  const { data: products, status, error, reload } = useAsync(
    () => api.getAdminProducts(),
    [],
    { initialData: [], fallbackError: 'Could not load products.' },
  );

  if (status === 'loading') return <Spinner label="Loading products…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="updateProduct">
      <div className="title">
        <p>Update Product</p>
      </div>

      {products.length === 0 ? (
        <Empty message="No products yet. Add one first." />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Edit</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.Product_id}>
                  <td>
                    <Link
                      to={`/admin/updateProduct/${product.Product_id}`}
                      aria-label={`Edit ${product.Product_name}`}
                    >
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <img
                      src={product.Product_image}
                      alt={product.Product_name}
                      width="100"
                      height="70"
                      onError={onImageError}
                    />
                  </td>
                  <td>{product.Product_name}</td>
                  <td>
                    {/* Guarded — a null description used to crash the whole table. */}
                    {(product.Product_description ?? '').slice(0, 100)}
                    {(product.Product_description ?? '').length > 100 ? '…' : ''}
                  </td>
                  <td>${product.Product_price?.toLocaleString()}</td>
                  <td>{product.Quantity}</td>
                  <td>${product.Discount ?? 0}</td>
                  <td>{product.IsAvailable ? 'Available' : 'Not available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
