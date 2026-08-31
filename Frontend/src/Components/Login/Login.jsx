import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { api, errorMessage, IS_DEMO } from '../../lib/api';
import { DEMO_ADMIN } from '../../lib/demo/fixtures';
import {
  authLoading,
  authSucceeded,
  authFailed,
  selectAuthStatus,
  selectAuthError,
} from '../../redux/slices/authReducer';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  // An object, not the empty string the old component initialised state with.
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(authLoading());
    try {
      const result = await api.login(values);
      dispatch(authSucceeded(result));
      navigate(location.state?.from?.pathname ?? '/', { replace: true });
    } catch (err) {
      // The old version had no rejection handler at all, so a wrong password
      // was an unhandled promise rejection and the form just sat there.
      dispatch(authFailed(errorMessage(err, 'Could not sign you in.')));
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Sign in</h1>

        {IS_DEMO && (
          <p className="form-hint">
            Demo account: <code>{DEMO_ADMIN.email}</code> / <code>{DEMO_ADMIN.password}</code>
          </p>
        )}

        <form onSubmit={handleLogin} noValidate>
          <div className="form-submission">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-submission">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              name="password"
              autoComplete="current-password"
              required
              value={values.password}
              onChange={handleChange}
            />
          </div>

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
          No account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
