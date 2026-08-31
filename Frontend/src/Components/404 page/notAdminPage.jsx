import { Link } from 'react-router-dom';
import './notFound.css';

const NotAdminPage = () => (
  <div className="notAdmin">
    <p className="notAdmin__code">404</p>
    <h1>We couldn’t find that page</h1>
    <p>
      The page may have moved, or you may not have permission to view it. Administrator screens
      need an account with the Admin role.
    </p>
    <div className="notAdmin__actions">
      <Link to="/" className="call-to-action-button">
        Back to the shop
      </Link>
      <Link to="/adminLogin" className="secondary-link">
        Admin sign in
      </Link>
    </div>
  </div>
);

export default NotAdminPage;
