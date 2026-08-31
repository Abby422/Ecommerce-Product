import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, errorMessage } from '../../../lib/api';

import { CATEGORIES } from '../../../lib/demo/catalogue';

const EMPTY = {
  categoryName: CATEGORIES[0].slug,
  productName: '',
  productDesc: '',
  productImg: '',
  productPrice: '',
  quantity: '',
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await api.addProduct(product);
      setProduct(EMPTY);
      setStatus('done');
      navigate('/admin/updateProduct');
    } catch (err) {
      // Previously the response was only console.logged, success or failure.
      setError(errorMessage(err, 'Could not add the product.'));
      setStatus('idle');
    }
  };

  return (
    <div className="addProduct">
      <div className="title">
        <p>Add Product</p>
      </div>

      <div className="addProductForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="categoryName">Category</label>
          <select
            id="categoryName"
            name="categoryName"
            value={product.categoryName}
            onChange={handleChange}
          >
            {CATEGORIES.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="productName">Product name</label>
          <input
            id="productName"
            name="productName"
            type="text"
            required
            autoComplete="off"
            value={product.productName}
            onChange={handleChange}
          />

          <label htmlFor="productDesc">Product description</label>
          <textarea
            id="productDesc"
            name="productDesc"
            required
            rows="6"
            value={product.productDesc}
            onChange={handleChange}
          />

          <label htmlFor="productImg">Image URL</label>
          <input
            id="productImg"
            name="productImg"
            type="url"
            required
            placeholder="https://…"
            value={product.productImg}
            onChange={handleChange}
          />

          <label htmlFor="productPrice">Price</label>
          <input
            id="productPrice"
            name="productPrice"
            type="number"
            min="0"
            step="0.01"
            required
            value={product.productPrice}
            onChange={handleChange}
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            step="1"
            required
            value={product.quantity}
            onChange={handleChange}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Adding…' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
