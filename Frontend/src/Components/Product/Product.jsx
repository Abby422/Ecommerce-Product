import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline, IoHeart, IoHeartOutline } from 'react-icons/io5';
import './Product.css';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import Stars from '../common/Stars';
import { useToast } from '../common/toastContext';
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
  selectCartItem,
} from '../../redux/slices/cartReducer';
import { toggleWish, selectIsWished } from '../../redux/slices/wishlistReducer';
import { openCartDrawer } from '../../redux/slices/uiReducer';

const LOW_STOCK = 5;

function Product({ product }) {
  const dispatch = useDispatch();
  const toast = useToast();
  // `.find` on the cart, not a `.map` that produced ["", 2, ""] and was then
  // compared against a number.
  const cartItem = useSelector(selectCartItem(product.Product_id));
  const wished = useSelector(selectIsWished(product.Product_id));

  const quantity = cartItem?.quantity ?? 0;
  const outOfStock = product.Quantity <= 0;
  const lowStock = !outOfStock && product.Quantity <= LOW_STOCK;
  const onSale = product.Discount > 0 && product.List_price > product.Product_price;

  const handleAdd = () => {
    dispatch(addItem(product));
    toast.success(`${product.Product_name} added to your cart`, {
      action: { label: 'View cart', onClick: () => dispatch(openCartDrawer()) },
    });
  };

  const handleWish = () => {
    dispatch(toggleWish(product.Product_id));
    toast.toast(wished ? 'Removed from your wishlist' : 'Saved to your wishlist');
  };

  return (
    <article className="products-card">
      <div className="products-card__media">
        <Link to={`/product/${product.Product_id}`} aria-label={product.Product_name}>
          <img
            src={product.Product_image}
            alt={product.Product_name}
            loading="lazy"
            onError={onImageError}
          />
        </Link>

        <button
          type="button"
          className={`wish-button${wished ? ' is-wished' : ''}`}
          onClick={handleWish}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.Product_name} from wishlist` : `Save ${product.Product_name} to wishlist`}
        >
          {wished ? <IoHeart /> : <IoHeartOutline />}
        </button>

        <div className="products-card__flags">
          {onSale && <span className="flag flag--sale">Save {formatMoney(product.Discount)}</span>}
          {outOfStock && <span className="flag flag--out">Sold out</span>}
        </div>
      </div>

      <div className="products-card__body">
        <Link to={`/product/${product.Product_id}`} className="products-card__title">
          {product.Product_name}
        </Link>

        {product.Review_count > 0 && (
          <Stars rating={product.Rating} count={product.Review_count} size="sm" />
        )}

        <p className="products-card__price">
          <span className="price-now">{formatMoney(product.Product_price)}</span>
          {onSale && <s className="price-was">{formatMoney(product.List_price)}</s>}
        </p>

        {lowStock && <p className="stock-warning">Only {product.Quantity} left</p>}
      </div>

      <div className="product-action">
        {cartItem ? (
          <div className="quantity-stepper">
            <button
              type="button"
              className="count-button"
              onClick={() => dispatch(decrementQuantity(product.Product_id))}
              aria-label={`Remove one ${product.Product_name}`}
            >
              −
            </button>
            <span aria-live="polite">{quantity} in cart</span>
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
            onClick={handleAdd}
          >
            <IoCartOutline /> {outOfStock ? 'Sold out' : 'Add to cart'}
          </button>
        )}
      </div>
    </article>
  );
}

export default Product;
