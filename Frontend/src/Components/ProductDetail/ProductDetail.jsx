import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCartOutline, IoHeart, IoHeartOutline, IoCheckmark, IoRefresh, IoShieldCheckmark } from 'react-icons/io5';
import './ProductDetail.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import { CATEGORIES } from '../../lib/demo/catalogue';
import Stars from '../common/Stars';
import Breadcrumbs from '../common/Breadcrumbs';
import ProductRail from '../common/ProductRail';
import Reviews from '../Reviews/Reviews';
import { SkeletonLines } from '../common/Skeleton';
import { ErrorMessage, Empty } from '../common/Status';
import { useToast } from '../common/toastContext';
import { addItem, selectCartItem } from '../../redux/slices/cartReducer';
import { toggleWish, selectIsWished } from '../../redux/slices/wishlistReducer';
import { openCartDrawer } from '../../redux/slices/uiReducer';

const LOW_STOCK = 5;

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, status, error, reload } = useAsync(
    () => api.getProduct(productId),
    [productId],
    { fallbackError: 'Could not load this product.' },
  );

  const { data: related } = useAsync(() => api.getRelated(productId), [productId], {
    initialData: [],
  });
  const { data: reviews, reload: reloadReviews } = useAsync(
    () => api.getReviews(productId),
    [productId],
    { initialData: [] },
  );
  const { data: recentlyViewed } = useAsync(
    () => api.getRecentlyViewed(productId),
    [productId, product?.Product_id],
    { initialData: [] },
  );

  // Hooks must run unconditionally, so the cart lookup happens before any early
  // return — with a null-safe id while the fetch is still in flight.
  const cartItem = useSelector(selectCartItem(product?.Product_id ?? -1));
  const wished = useSelector(selectIsWished(product?.Product_id ?? -1));

  // Reset the gallery and quantity when navigating between products.
  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
  }, [productId]);

  useEffect(() => {
    if (product) api.recordView(product.Product_id);
  }, [product]);

  if (status === 'loading') {
    return (
      <div className="product product--loading">
        <div className="skeleton skeleton--hero" />
        <div className="detail-container">
          <SkeletonLines count={5} />
        </div>
      </div>
    );
  }
  if (status === 'failed') return <ErrorMessage message={error} onRetry={reload} />;
  if (!product) {
    return (
      <div className="product-missing">
        <Empty message="We couldn’t find that product." />
        <Link to="/shop" className="button-primary">
          Back to the shop
        </Link>
      </div>
    );
  }

  const outOfStock = product.Quantity <= 0;
  const lowStock = !outOfStock && product.Quantity <= LOW_STOCK;
  const onSale = product.Discount > 0 && product.List_price > product.Product_price;
  const images = product.Product_images?.length ? product.Product_images : [product.Product_image];
  const categoryName = CATEGORIES.find((c) => c.slug === product.Category)?.name ?? product.Category;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i += 1) dispatch(addItem(product));
    toast.success(`${quantity} × ${product.Product_name} added`, {
      action: { label: 'View cart', onClick: () => dispatch(openCartDrawer()) },
    });
  };

  return (
    <>
      <div className="detail-page">
        <Breadcrumbs
          trail={[
            { to: '/', label: 'Home' },
            { to: '/shop', label: 'Shop' },
            { to: `/category/${product.Category}`, label: categoryName },
            { label: product.Product_name },
          ]}
        />

        <div className="product">
          <div className="gallery">
            <div className="gallery__main">
              <img
                src={images[activeImage]}
                alt={product.Product_name}
                onError={onImageError}
              />
              {onSale && <span className="flag flag--sale">Save {formatMoney(product.Discount)}</span>}
            </div>

            {images.length > 1 && (
              <div className="gallery__thumbs" role="tablist" aria-label="Product images">
                {images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    role="tab"
                    aria-selected={index === activeImage}
                    aria-label={`Image ${index + 1} of ${images.length}`}
                    className={`gallery__thumb${index === activeImage ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={src} alt="" onError={onImageError} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail-container">
            <p className="detail-category">{categoryName}</p>
            <h1>{product.Product_name}</h1>

            {product.Review_count > 0 && (
              <a href="#reviews" className="detail-rating">
                <Stars rating={product.Rating} count={product.Review_count} showValue />
              </a>
            )}

            <p className="price">
              <span className="price-now">{formatMoney(product.Product_price)}</span>
              {onSale && <s className="price-was">{formatMoney(product.List_price)}</s>}
            </p>

            <p className="detail-description">{product.Product_description}</p>

            <p className={`stock-line${lowStock ? ' is-low' : ''}${outOfStock ? ' is-out' : ''}`}>
              {outOfStock
                ? 'Out of stock'
                : lowStock
                  ? `Only ${product.Quantity} left in stock`
                  : `In stock — ${product.Quantity} available`}
            </p>

            <div className="buy-row">
              <label className="qty-select">
                <span className="visually-hidden">Quantity</span>
                <select
                  value={quantity}
                  disabled={outOfStock}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                >
                  {Array.from({ length: Math.min(10, Math.max(1, product.Quantity)) }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className="button-primary buy-button"
                disabled={outOfStock}
                onClick={handleAdd}
              >
                <IoCartOutline /> {outOfStock ? 'Sold out' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={`button-secondary wish-inline${wished ? ' is-wished' : ''}`}
                onClick={() => {
                  dispatch(toggleWish(product.Product_id));
                  toast.toast(wished ? 'Removed from your wishlist' : 'Saved to your wishlist');
                }}
                aria-pressed={wished}
              >
                {wished ? <IoHeart /> : <IoHeartOutline />}
                {wished ? 'Saved' : 'Save'}
              </button>
            </div>

            {cartItem && (
              <p className="in-cart-note">
                <IoCheckmark /> {cartItem.quantity} already in your cart ·{' '}
                <Link to="/cart">view cart</Link>
              </p>
            )}

            <ul className="assurances">
              <li>
                <IoRefresh /> Free 30-day returns
              </li>
              <li>
                {/* Details.Warranty already reads as a phrase ("10 years on the
                    frame"), so it is used verbatim rather than suffixed. */}
                <IoShieldCheckmark />{' '}
                {product.Details?.Warranty && product.Details.Warranty !== '—'
                  ? `Warranty: ${product.Details.Warranty}`
                  : '2 year warranty'}
              </li>
              <li>
                <IoCheckmark /> Free shipping over {formatMoney(api.getFreeShippingThreshold())}
              </li>
            </ul>

            {product.Details && Object.keys(product.Details).length > 0 && (
              <div className="spec-table">
                <h2>Details</h2>
                <dl>
                  {Object.entries(product.Details).map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                  <div>
                    <dt>SKU</dt>
                    <dd>{product.SKU}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      <Reviews
        productId={product.Product_id}
        reviews={reviews}
        rating={product.Rating}
        count={product.Review_count}
        onAdded={() => {
          reloadReviews();
          reload();
        }}
      />

      <ProductRail title="You might also like" products={related} />
      <ProductRail title="Recently viewed" products={recentlyViewed} />
    </>
  );
}

export default ProductDetail;
