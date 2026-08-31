import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css';
import { api, errorMessage } from '../../lib/api';
import {
  authLoading,
  authSucceeded,
  authFailed,
  selectAuthStatus,
  selectAuthError,
} from '../../redux/slices/authReducer';

const EMPTY = { email: '', userName: '', Name: '', password: '' };

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const [values, setValues] = useState(EMPTY);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (values.password.length < 8) {
      dispatch(authFailed('Password must be at least 8 characters.'));
      return;
    }
    dispatch(authLoading());
    try {
      const result = await api.register(values);
      dispatch(authSucceeded(result));
      navigate('/', { replace: true });
    } catch (err) {
      dispatch(authFailed(errorMessage(err, 'Could not create your account.')));
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Create an account</h1>

        <form onSubmit={handleRegister} noValidate>
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
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              type="text"
              placeholder="Username"
              name="userName"
              autoComplete="username"
              required
              value={values.userName}
              onChange={handleChange}
            />
          </div>

          <div className="form-submission">
            <label htmlFor="Name">Name</label>
            <input
              id="Name"
              type="text"
              placeholder="Your name"
              name="Name"
              autoComplete="name"
              required
              value={values.Name}
              onChange={handleChange}
            />
          </div>

          <div className="form-submission">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
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
            {status === 'loading' ? 'Creating account…' : 'Register'}
          </button>
        </form>

        <p className="form-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
