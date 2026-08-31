import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout } from 'react-icons/ai';
import './admin.css';
import { logout, selectUser } from '../../../redux/slices/authReducer';

const LINKS = [
  // `end` so Dashboard is only active on /admin itself, not every nested route.
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/addProduct', label: 'Add Product' },
  { to: '/admin/updateProduct', label: 'Update Product' },
  { to: '/admin/deleteProduct', label: 'Delete Product' },
  { to: '/admin/setAdmin', label: 'Set Admin' },
];

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const name = user?.Name ?? user?.userName ?? user?.email ?? 'admin';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <div className="adminPage">
      <aside className="navigation">
        <Link to="/" className="admin-logo">
          SPACEJOY
        </Link>
        <nav className="links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              <p>{link.label}</p>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="content">
        <header className="navbar">
          <div className="welcome">
            <span className="text">{`Welcome, ${name}`}</span>
            <button
              type="button"
              className="icon link-button"
              onClick={handleLogout}
              aria-label="Sign out"
            >
              <AiOutlineLogout />
            </button>
          </div>
        </header>

        <div className="changingContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
