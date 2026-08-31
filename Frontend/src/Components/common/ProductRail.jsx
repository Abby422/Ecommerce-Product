import Product from '../Product/Product';
import './ProductRail.css';

// A horizontally scrolling strip of cards, used for related products and
// recently viewed. Falls back to nothing when there is nothing to show.
export default function ProductRail({ title, products, id }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="product-rail" id={id}>
      <h2>{title}</h2>
      <div className="product-rail__track">
        {products.map((product) => (
          <div className="product-rail__item" key={product.Product_id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
