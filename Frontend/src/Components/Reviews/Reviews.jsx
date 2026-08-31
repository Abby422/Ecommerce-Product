import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import './Reviews.css';
import { api, errorMessage } from '../../lib/api';
import { formatRelative } from '../../lib/format';
import Stars, { StarInput } from '../common/Stars';
import { useToast } from '../common/toastContext';
import { selectIsAuthenticated, selectUser } from '../../redux/slices/authReducer';

export default function Reviews({ productId, reviews, rating, count, onAdded }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const toast = useToast();

  const [writing, setWriting] = useState(false);
  const [form, setForm] = useState({ rating: 5, body: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Distribution bars, computed from the reviews actually on screen.
  const distribution = useMemo(() => {
    const buckets = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      buckets[review.rating] = (buckets[review.rating] ?? 0) + 1;
    });
    return buckets;
  }, [reviews]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.body.trim().length < 10) {
      setError('Please write at least a sentence.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.addReview({
        productId,
        author: user?.Name ?? user?.userName ?? 'You',
        rating: form.rating,
        body: form.body.trim(),
      });
      setForm({ rating: 5, body: '' });
      setWriting(false);
      toast.success('Thanks — your review is live');
      onAdded?.();
    } catch (err) {
      setError(errorMessage(err, 'Could not post your review.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="reviews" id="reviews">
      <h2>Reviews</h2>

      <div className="reviews__summary">
        <div className="reviews__score">
          <p className="reviews__average">{rating.toFixed(1)}</p>
          <Stars rating={rating} size="lg" />
          <p className="reviews__total">
            {count.toLocaleString()} review{count === 1 ? '' : 's'}
          </p>
        </div>

        <div className="reviews__bars">
          {[5, 4, 3, 2, 1].map((stars) => {
            const value = distribution[stars] ?? 0;
            const percent = reviews.length ? (value / reviews.length) * 100 : 0;
            return (
              <div className="reviews__bar" key={stars}>
                <span className="reviews__bar-label">{stars}★</span>
                <div className="reviews__bar-track">
                  <div className="reviews__bar-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="reviews__bar-count">{value}</span>
              </div>
            );
          })}
        </div>

        <div className="reviews__cta">
          {isAuthenticated ? (
            <button
              type="button"
              className="button-secondary"
              onClick={() => setWriting((v) => !v)}
            >
              {writing ? 'Cancel' : 'Write a review'}
            </button>
          ) : (
            <p className="reviews__signin">Sign in to leave a review.</p>
          )}
        </div>
      </div>

      {writing && (
        <form className="review-form" onSubmit={handleSubmit}>
          <label htmlFor="review-body">Your rating</label>
          <StarInput value={form.rating} onChange={(rating) => setForm((f) => ({ ...f, rating }))} />

          <label htmlFor="review-body">Your review</label>
          <textarea
            id="review-body"
            rows="4"
            required
            placeholder="How is it in person? Did it arrive well packed?"
            value={form.body}
            onChange={(event) => setForm((f) => ({ ...f, body: event.target.value }))}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="button-primary" disabled={saving}>
            {saving ? 'Posting…' : 'Post review'}
          </button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="reviews__empty">No reviews yet — be the first.</p>
      ) : (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <li key={review.id} className="review">
              <div className="review__head">
                <Stars rating={review.rating} size="sm" />
                <span className="review__author">{review.author}</span>
                {review.verified && <span className="review__verified">Verified purchase</span>}
                <span className="review__date">{formatRelative(review.daysAgo)}</span>
              </div>
              <p className="review__body">{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
