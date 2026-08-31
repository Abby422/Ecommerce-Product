import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuthenticated } from '../../redux/slices/authReducer';

// The admin area previously rendered for anyone who typed /admin into the bar.
export default function ProtectedRoute({ adminOnly = false }) {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAuthenticated) {
    const to = adminOnly ? '/adminLogin' : '/login';
    return <Navigate to={to} state={{ from: location }} replace />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/notFound" replace />;
  }
  return <Outlet />;
}
