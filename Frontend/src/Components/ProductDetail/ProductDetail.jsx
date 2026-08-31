import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import './ProductDetail.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { onImageError } from '../../lib/placeholder';
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  selectCartItem,
} from '../../redux/slices/cartReducer';
import { Spinner, ErrorMessage, Empty } from '../common/Status';

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { data: product, status, error, reload } = useAsync(
    () => api.getProduct(productId),
    [productId],
    { fallbackError: 'Could not load this product.' },
  );

  // Hooks must run unconditionally, so the cart lookup happens before any early
  // return — with a null-safe id while the fetch is still in flight.
  const cartItem = useSelector(selectCartItem(product?.Product_id ?? -1));
  const quantity = cartItem?.quantity ?? 0;

  if (status === 'loading') return <Spinner label="Loading product…" />;
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;
  if (!product) {
    return (
      <div className="product-missing">
        <Empty message="We couldn’t find that product." />
        <Link to="/">Back to the shop</Link>
      </div>
    );
  }

  const outOfStock = product.Quantity <= 0;

  return (
    <div className="product">
      <div className="productImage">
        <img src={product.Product_image} alt={product.Product_name} onError={onImageError} />
      </div>

      <div className="detail-container">
        <div className="detail-content">
          <div>
            <h2>{product.Product_name}</h2>
            <p>{product.Product_description}</p>
            <div className="price">
              ${product.Product_price.toLocaleString()}
              {product.Discount > 0 && (
                <span className="discount">${product.Discount} off</span>
              )}
            </div>
            <p className="stock">
              {outOfStock ? 'Out of stock' : `${product.Quantity} available`}
            </p>
          </div>

          <div className="product-buttons">
            {cartItem ? (
              <div className="call-to-action-button quantity-stepper">
                <button
                  type="button"
                  className="count-button"
                  onClick={() => dispatch(decrementQuantity(product.Product_id))}
                  aria-label="Remove one"
                >
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  className="count-button"
                  disabled={quantity >= product.Quantity}
                  onClick={() => dispatch(incrementQuantity(product.Product_id))}
                  aria-label="Add one"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="call-to-action-button"
                disabled={outOfStock}
                onClick={() => dispatch(addItem(product))}
              >
                <IoCartOutline /> Add to cart
              </button>
            )}
            <Link to="/cart" className="secondary-link">
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
