import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './adminLogin.css';
import { api, errorMessage, IS_DEMO } from '../../lib/api';
import { DEMO_ADMIN } from '../../lib/demo/fixtures';
import {
  authLoading,
  authSucceeded,
  authFailed,
  selectAuthStatus,
  selectAuthError,
} from '../../redux/slices/authReducer';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  // preventDefault, so the form no longer reloads the page mid-request; and the
  // success branch is braced, so a failed login can no longer fall through into
  // storing a session.
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(authLoading());
    try {
      const result = await api.adminLogin(values);
      dispatch(authSucceeded({ ...result, role: 'Admin' }));
      navigate('/admin', { replace: true });
    } catch (err) {
      dispatch(authFailed(errorMessage(err, 'Could not sign you in.')));
    }
  };

  return (
    <div className="adminLogin">
      <div className="form">
        <h1>Admin sign in</h1>

        {IS_DEMO && (
          <p className="form-hint">
            Demo admin: <code>{DEMO_ADMIN.email}</code> / <code>{DEMO_ADMIN.password}</code>
          </p>
        )}

        <form onSubmit={handleLogin} noValidate>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="form-footer">
          <Link to="/">Back to the shop</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
