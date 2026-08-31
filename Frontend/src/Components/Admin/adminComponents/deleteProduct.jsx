import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { api, errorMessage } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { onImageError } from '../../../lib/placeholder';
import { Spinner, ErrorMessage, Empty } from '../../common/Status';

const DeleteProduct = () => {
  const { data: products, status, error, reload } = useAsync(
    () => api.getAdminProducts(),
    [],
    { initialData: [], fallbackError: 'Could not load products.' },
  );
  const [pendingId, setPendingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [confirming, setConfirming] = useState(null);

  // The old handler called setId(id) then immediately called a delete function
  // that read `id` from the previous render — so it deleted the previously
  // clicked product, or id 0 on the first click. The id is now passed directly.
  const handleDelete = async (id) => {
    setPendingId(id);
    setActionError(null);
    try {
      await api.deleteProduct(id);
      setConfirming(null);
      reload();
    } catch (err) {
      setActionError(errorMessage(err, 'Could not delete the product.'));
    } finally {
      setPendingId(null);
    }
  };

  if (status === 'loading') return <Spinner label="Loading products…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <div className="deleteProduct">
      <div className="title">
        <p>Delete Product</p>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {products.length === 0 ? (
        <Empty message="Nothing to delete." />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Available</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.Product_id}>
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
                    {(product.Product_description ?? '').slice(0, 100)}
                    {(product.Product_description ?? '').length > 100 ? '…' : ''}
                  </td>
                  <td>${product.Product_price?.toLocaleString()}</td>
                  <td>{product.Quantity}</td>
                  <td>{product.IsAvailable ? 'Available' : 'Not available'}</td>
                  <td>
                    {confirming === product.Product_id ? (
                      <span className="confirm-group">
                        <button
                          type="button"
                          className="link-button danger"
                          disabled={pendingId === product.Product_id}
                          onClick={() => handleDelete(product.Product_id)}
                        >
                          {pendingId === product.Product_id ? 'Deleting…' : 'Confirm'}
                        </button>
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => setConfirming(null)}
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="link-button danger"
                        onClick={() => setConfirming(product.Product_id)}
                        aria-label={`Delete ${product.Product_name}`}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
