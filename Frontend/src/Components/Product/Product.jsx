import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline } from 'react-icons/io5';
import './Product.css';
import { onImageError } from '../../lib/placeholder';
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  selectCartItem,
} from '../../redux/slices/cartReducer';

const style = { textDecoration: 'none' };

function Product({ product }) {
  const dispatch = useDispatch();
  // `.find` on the cart, not a `.map` that produced ["", 2, ""] and was then
  // compared against a number.
  const cartItem = useSelector(selectCartItem(product.Product_id));
  const quantity = cartItem?.quantity ?? 0;
  const outOfStock = product.Quantity <= 0;

  return (
    <div className="products-card">
      <Link to={`/product/${product.Product_id}`} style={style}>
        <img
          src={product.Product_image}
          alt={product.Product_name}
          loading="lazy"
          onError={onImageError}
        />
      </Link>
      <div className="products-card__body">
        <h5>{product.Product_name}</h5>
        <h6>${product.Product_price.toLocaleString()}</h6>
        {outOfStock && <span className="badge-out">Out of stock</span>}
      </div>

      <div className="product-action">
        <Link to={`/product/${product.Product_id}`} style={style}>
          <button type="button" className="call-to-action-button">
            View More
          </button>
        </Link>

        {cartItem ? (
          <div className="call-to-action-button quantity-stepper">
            <button
              type="button"
              className="count-button"
              onClick={() => dispatch(decrementQuantity(product.Product_id))}
              aria-label={`Remove one ${product.Product_name}`}
            >
              −
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              type="button"
              className="count-button"
              disabled={quantity >= product.Quantity}
              onClick={() => dispatch(incrementQuantity(product.Product_id))}
              aria-label={`Add one ${product.Product_name}`}
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
      </div>
    </div>
  );
}

export default Product;
