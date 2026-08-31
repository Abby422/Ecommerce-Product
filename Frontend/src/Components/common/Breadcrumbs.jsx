import { Link } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import './Breadcrumbs.css';

export default function Breadcrumbs({ trail = [] }) {
  if (trail.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={`${crumb.label}-${index}`}>
              {crumb.to && !last ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{crumb.label}</span>
              )}
              {!last && <IoChevronForward aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
