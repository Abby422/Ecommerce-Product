import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Wishlist.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { selectWishlistIds } from '../../redux/slices/wishlistReducer';
import Product from '../Product/Product';
import Breadcrumbs from '../common/Breadcrumbs';
import { SkeletonGrid } from '../common/Skeleton';
import { Empty } from '../common/Status';

export default function Wishlist() {
  const ids = useSelector(selectWishlistIds);

  // Wishlist membership lives in Redux (so every card stays in sync), but the
  // product records themselves are fetched, so prices and stock stay current.
  const { data: products, status } = useAsync(
    async () => {
      const results = await Promise.all(ids.map((id) => api.getProduct(id)));
      return results.filter(Boolean);
    },
    [ids.join(',')],
    { initialData: [] },
  );

  return (
    <div className="wishlist">
      <Breadcrumbs trail={[{ to: '/', label: 'Home' }, { label: 'Wishlist' }]} />
      <h1>Your wishlist</h1>

      {status === 'loading' && ids.length > 0 && <SkeletonGrid count={Math.min(ids.length, 4)} />}

      {ids.length === 0 && (
        <div className="wishlist__empty">
          <Empty message="Nothing saved yet. Tap the heart on any product to keep it here." />
          <Link to="/shop" className="button-primary">
            Browse the shop
          </Link>
        </div>
      )}

      {status === 'succeeded' && products.length > 0 && (
        <div className="products">
          {products.map((product) => (
            <Product key={product.Product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
