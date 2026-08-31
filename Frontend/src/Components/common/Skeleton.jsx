import './Skeleton.css';

// Shape-matched placeholders. A skeleton that mirrors the real layout stops the
// page jumping when the data lands, which a centred spinner does not.
export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton--image" />
      <div className="skeleton skeleton--line" style={{ width: '75%' }} />
      <div className="skeleton skeleton--line" style={{ width: '40%' }} />
      <div className="skeleton skeleton--button" />
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="products" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonLines({ count = 3, width = '100%' }) {
  return (
    <div aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="skeleton skeleton--line"
          style={{ width: i === count - 1 ? '60%' : width }}
        />
      ))}
    </div>
  );
}
