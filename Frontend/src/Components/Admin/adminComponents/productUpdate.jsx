import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, errorMessage } from '../../../lib/api';
import { useAsync } from '../../../lib/useAsync';
import { onImageError } from '../../../lib/placeholder';
import { Spinner, ErrorMessage, Empty } from '../../common/Status';

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, status, error, reload } = useAsync(
    () => api.getOneProduct(id),
    [id],
    { fallbackError: 'Could not load that product.' },
  );

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Seed the form once the product arrives. The old version set state *inside*
  // the fetch effect and then listed those same state values in its dependency
  // array, which refetched on every render in a loop.
  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.Product_name ?? '',
      desc: product.Product_description ?? '',
      quantity: product.Quantity ?? 0,
      price: product.Product_price ?? 0,
      discount: product.Discount ?? 0,
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      await api.updateProduct({ id, ...form });
      navigate('/admin/updateProduct');
    } catch (err) {
      setSaveError(errorMessage(err, 'Could not save your changes.'));
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading') return <Spinner label="Loading product…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;
  if (!product) return <Empty message="That product no longer exists." />;
  if (!form) return <Spinner />;

  return (
    <div className="productUpdate">
      <div className="title">
        <p>Update Product</p>
      </div>

      <form className="product-update-form" onSubmit={handleSubmit}>
        <div className="img">
          <img
            src={product.Product_image}
            alt={product.Product_name}
            width="400"
            height="300"
            onError={onImageError}
          />
        </div>

        <div className="text">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />

          <label htmlFor="desc">Description</label>
          <textarea id="desc" name="desc" rows="8" required value={form.desc} onChange={handleChange} />

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            step="1"
            required
            value={form.quantity}
            onChange={handleChange}
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={handleChange}
          />

          <label htmlFor="discount">Discount</label>
          <input
            id="discount"
            name="discount"
            type="number"
            min="0"
            step="0.01"
            value={form.discount}
            onChange={handleChange}
          />

          {saveError && (
            <p className="form-error" role="alert">
              {saveError}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Update Product'}
            </button>
            <Link to="/admin/updateProduct" className="secondary-link">
              Go back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
