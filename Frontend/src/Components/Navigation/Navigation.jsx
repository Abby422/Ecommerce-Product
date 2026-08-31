import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import './Navigation.css';
import { selectCartCount } from '../../redux/slices/cartReducer';
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from '../../redux/slices/authReducer';

const style = { color: 'black' };

function Navigation() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Submitting a form means Enter works, and an empty box no longer navigates
  // to the literal path /search/null.
  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <nav className="Navigation">
      <div className="abby-navigation-logo">
        <Link to="/" style={style} aria-label="Home">
          <GiHamburgerMenu />
        </Link>
        <Link to="/" className="logo" style={style}>
          SPACEJOY
        </Link>
      </div>

      <IconContext.Provider value={{ size: 25 }}>
        <div className="abby-navigation-left">
          <form className="search-form" onSubmit={handleSearch} role="search">
            <label className="visually-hidden" htmlFor="site-search">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              name="searchBar"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="search-icon" aria-label="Search">
              <IoSearchOutline />
            </button>
          </form>

          {isAuthenticated ? (
            <div className="profile-group">
              <span className="profile" title={user?.Email ?? user?.email}>
                <CgProfile />
              </span>
              <button type="button" className="link-button" onClick={() => dispatch(logout())}>
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" style={style} className="profile" aria-label="Sign in">
              <CgProfile />
            </Link>
          )}

          <Link to="/cart" style={style} aria-label={`Cart, ${cartCount} items`}>
            <div className="cart-icon">
              <IoCartOutline />
              {cartCount > 0 && <div className="cart-count">{cartCount}</div>}
            </div>
          </Link>
        </div>
      </IconContext.Provider>
    </nav>
  );
}

export default Navigation;
