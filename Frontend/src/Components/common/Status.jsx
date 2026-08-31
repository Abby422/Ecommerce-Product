// Shared loading / empty / error blocks so every screen reports itself the same
// way. The original app rendered a bare "Please Wait :)" that never went away
// when a request failed.

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="status status--loading" role="status" aria-live="polite">
      <span className="status__dot" />
      <span>{label}</span>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status status--error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="call-to-action-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function Empty({ message }) {
  return (
    <div className="status status--empty">
      <p>{message}</p>
    </div>
  );
}
