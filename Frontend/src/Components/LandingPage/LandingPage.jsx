import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FiChevronsRight } from 'react-icons/fi';
import { IoLeafOutline, IoRefreshOutline, IoRibbonOutline } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LandingPage.css';
import ImageOne from '../../Images/Caurosel1.jpg';
import ImageTwo from '../../Images/Caurosel2.jpg';
import ImageThree from '../../Images/Caurosel3.jpg';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { CATEGORIES } from '../../lib/demo/catalogue';
import { IMG } from '../../lib/demo/images';
import Product from '../Product/Product';
import ProductRail from '../common/ProductRail';
import { SkeletonGrid } from '../common/Skeleton';

const SLIDES = [
  { src: ImageOne, alt: 'A styled living room' },
  { src: ImageTwo, alt: 'A bedroom with layered textiles' },
  { src: ImageThree, alt: 'A dining table set for a meal' },
];

// react-slick reads camelCase props: the old markup passed slideToShow and
// slideToScroll, neither of which exists, so both were silently ignored.
const SLIDER_SETTINGS = {
  autoplay: true,
  autoplaySpeed: 4500,
  dots: true,
  fade: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: true,
};

const CATEGORY_ART = {
  'living-room': IMG.sofaGreen,
  bedroom: IMG.bedBench,
  'kitchen-dining': IMG.tableRound,
  lighting: IMG.pendantBrass,
  decor: IMG.vaseGrass,
  storage: IMG.shelvingOak,
};

function LandingPage() {
  const { data: featured, status } = useAsync(
    () => api.getProducts({ pageNumber: 1, rowNumber: 8, sort: 'featured' }),
    [],
    { initialData: { items: [] } },
  );
  const { data: onSale } = useAsync(
    () => api.getProducts({ pageNumber: 1, rowNumber: 4, sort: 'price-asc', onSale: true }),
    [],
    { initialData: { items: [] } },
  );
  const { data: recentlyViewed } = useAsync(() => api.getRecentlyViewed(), [], {
    initialData: [],
  });

  return (
    <div className="home-content-container">
      <section className="landing-page-container">
        <div className="landingPage">
          <div className="landing-page-content">
            <h1>MADE FOR YOU</h1>
            <h2>ALL FOR YOUR HOME</h2>
            <p>
              At SPACEJOY you will find a considered selection of furniture, decor and accessories
              — from affordable everyday pieces to the one thing a room is built around.
            </p>

            <div className="landing-actions">
              {/* The link used to wrap nothing at all, leaving the CTA unclickable. */}
              <Link to="/shop" className="button-primary">
                Shop everything
              </Link>
              <Link to="/register" className="hero-link">
                Create an account <FiChevronsRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="landing-caurosel">
          <div className="slider-container">
            <Slider {...SLIDER_SETTINGS}>
              {SLIDES.map((slide) => (
                <div key={slide.src}>
                  <img src={slide.src} className="slider" alt={slide.alt} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

      </section>

      <div className="value-props-wrap">
        <ul className="value-props">
          <li>
            <IoRefreshOutline />
            <div>
              <strong>Free 30-day returns</strong>
              <span>Changed your mind? Send it back.</span>
            </div>
          </li>
          <li>
            <IoLeafOutline />
            <div>
              <strong>Responsibly sourced</strong>
              <span>FSC timber and undyed natural fibres.</span>
            </div>
          </li>
          <li>
            <IoRibbonOutline />
            <div>
              <strong>Built to last</strong>
              <span>Up to 10 years on frames.</span>
            </div>
          </li>
        </ul>
      </div>

      <section className="category-grid-section">
        <h2>Shop by room</h2>
        <div className="category-grid">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="category-tile"
              style={{ backgroundImage: `url(${CATEGORY_ART[category.slug]})` }}
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="products_container" id="shop">
        <header className="section-head">
          <h2>Featured</h2>
          <p className="section-lede">
            The pieces our customers come back for — chosen for how they wear, not how they
            photograph.
          </p>
        </header>

        {status === 'loading' ? (
          <SkeletonGrid count={8} />
        ) : (
          <div className="products">
            {featured.items.map((product) => (
              <Product key={product.Product_id} product={product} />
            ))}
          </div>
        )}

        <Link to="/shop" className="button-secondary view-all">
          View all products
        </Link>
      </section>

      <ProductRail title="On sale now" products={onSale.items} />
      <ProductRail title="Recently viewed" products={recentlyViewed} />
    </div>
  );
}

export default LandingPage;
