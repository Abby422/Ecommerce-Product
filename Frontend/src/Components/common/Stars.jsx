import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import './Stars.css';

// Read-only rating display. `count` renders the review total beside it.
export default function Stars({ rating = 0, count, size = 'md', showValue = false }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <span className={`stars stars--${size}`}>
      <span className="stars__icons" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => {
          if (rounded >= n) return <IoStar key={n} />;
          if (rounded >= n - 0.5) return <IoStarHalf key={n} />;
          return <IoStarOutline key={n} className="stars__empty" />;
        })}
      </span>
      <span className="visually-hidden">{rating.toFixed(1)} out of 5</span>
      {showValue && <span className="stars__value">{rating.toFixed(1)}</span>}
      {count != null && (
        <span className="stars__count">
          ({count.toLocaleString()})
        </span>
      )}
    </span>
  );
}

// The interactive version, for the write-a-review form.
export function StarInput({ value, onChange, name = 'rating' }) {
  return (
    <span className="stars stars--input" role="radiogroup" aria-label="Your rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n === 1 ? '' : 's'}`}
          className="stars__button"
          onClick={() => onChange(n)}
        >
          {value >= n ? <IoStar /> : <IoStarOutline className="stars__empty" />}
        </button>
      ))}
      <input type="hidden" name={name} value={value} />
    </span>
  );
}
