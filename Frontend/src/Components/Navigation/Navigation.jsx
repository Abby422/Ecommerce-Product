import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { IoSearchOutline, IoCartOutline, IoHeartOutline, IoClose, IoMenu } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import './Navigation.css';
import { api } from '../../lib/api';
import { useDebounced } from '../../lib/useDebounced';
import { formatMoney } from '../../lib/format';
import { onImageError } from '../../lib/placeholder';
import { CATEGORIES } from '../../lib/demo/catalogue';
import { selectCartCount } from '../../redux/slices/cartReducer';
import { selectWishlistCount } from '../../redux/slices/wishlistReducer';
import { openCartDrawer } from '../../redux/slices/uiReducer';
import { selectIsAuthenticated, selectUser, logout } from '../../redux/slices/authReducer';

function Navigation() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const wishCount = useSelector(selectWishlistCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const debounced = useDebounced(query, 180);

  // Look up suggestions only once typing settles, and drop the result if a
  // newer keystroke has already superseded it.
  useEffect(() => {
    let cancelled = false;
    if (debounced.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    api
      .suggest(debounced)
      .then((results) => {
        if (!cancelled) setSuggestions(results);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  // Clicking anywhere outside closes the dropdown.
  useEffect(() => {
    const onClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  const goToSuggestion = (id) => {
    setOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  return (
    <header className="site-header">
      <nav className="Navigation">
        <div className="abby-navigation-logo">
          <button
            type="button"
            className="link-button nav-menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Browse categories"
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
          <Link to="/" className="logo">
            SPACEJOY
          </Link>
        </div>

        <IconContext.Provider value={{ size: 22 }}>
          <div className="abby-navigation-left">
            <div className="search-wrap" ref={searchRef}>
              <form className="search-form" onSubmit={submitSearch} role="search">
                <label className="visually-hidden" htmlFor="site-search">
                  Search products
                </label>
                <input
                  id="site-search"
                  type="search"
                  name="searchBar"
                  placeholder="Search products"
                  autoComplete="off"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                />
                <button type="submit" className="search-icon" aria-label="Search">
                  <IoSearchOutline />
                </button>
              </form>

              {open && suggestions.length > 0 && (
                <ul className="suggestions" role="listbox" aria-label="Product suggestions">
                  {suggestions.map((product) => (
                    <li key={product.Product_id}>
                      <button type="button" onClick={() => goToSuggestion(product.Product_id)}>
                        <img
                          src={product.Product_image}
                          alt=""
                          onError={onImageError}
                        />
                        <span className="suggestions__name">{product.Product_name}</span>
                        <span className="suggestions__price">
                          {formatMoney(product.Product_price)}
                        </span>
                      </button>
                    </li>
                  ))}
                  <li className="suggestions__all">
                    <button type="button" onClick={submitSearch}>
                      See all results for “{query.trim()}”
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <Link to="/wishlist" className="nav-icon" aria-label={`Wishlist, ${wishCount} items`}>
              <IoHeartOutline />
              {wishCount > 0 && <span className="nav-badge">{wishCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div className="profile-group">
                <Link to="/account" className="nav-icon" aria-label="Your account">
                  <CgProfile />
                </Link>
                <button
                  type="button"
                  className="link-button nav-signout"
                  onClick={() => dispatch(logout())}
                  title={user?.Email ?? user?.email}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-icon" aria-label="Sign in">
                <CgProfile />
              </Link>
            )}

            <button
              type="button"
              className="nav-icon"
              onClick={() => dispatch(openCartDrawer())}
              aria-label={`Open cart, ${cartCount} items`}
            >
              <IoCartOutline />
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
          </div>
        </IconContext.Provider>
      </nav>

      <div className={`category-bar${menuOpen ? ' is-open' : ''}`}>
        <NavLink to="/shop" end onClick={() => setMenuOpen(false)}>
          All
        </NavLink>
        {CATEGORIES.map((category) => (
          <NavLink
            key={category.slug}
            to={`/category/${category.slug}`}
            onClick={() => setMenuOpen(false)}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

export default Navigation;
