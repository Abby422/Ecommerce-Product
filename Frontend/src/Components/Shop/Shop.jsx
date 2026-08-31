import { useMemo, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { IoFilter, IoClose } from 'react-icons/io5';
import './Shop.css';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { CATEGORIES } from '../../lib/demo/catalogue';
import { formatMoney } from '../../lib/format';
import Product from '../Product/Product';
import Breadcrumbs from '../common/Breadcrumbs';
import { SkeletonGrid } from '../common/Skeleton';
import { ErrorMessage, Empty } from '../common/Status';

const PAGE_SIZE = 12;

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name: A–Z' },
];

const RATING_OPTIONS = [4.5, 4, 3];

export default function Shop() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  // The URL is the single source of truth for the query, so any filtered view
  // is linkable, shareable and survives the back button.
  const query = searchParams.get('q') ?? '';
  const sort = searchParams.get('sort') ?? 'featured';
  const page = Number(searchParams.get('page') ?? 1);
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('rating');
  const inStock = searchParams.get('inStock') === '1';
  const onSale = searchParams.get('onSale') === '1';
  const selectedCategories = useMemo(
    () => (slug ? [slug] : searchParams.getAll('category')),
    [slug, searchParams],
  );

  const { data: facets } = useAsync(() => api.getFacets(), [], {
    initialData: { counts: {}, minPrice: 0, maxPrice: 2500 },
  });

  const filters = useMemo(
    () => ({
      categories: selectedCategories,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
      inStock: inStock || undefined,
      onSale: onSale || undefined,
      query: query || undefined,
    }),
    [selectedCategories, maxPrice, minRating, inStock, onSale, query],
  );

  const { data, status, error, reload } = useAsync(
    () => api.getProducts({ pageNumber: page, rowNumber: PAGE_SIZE, sort, ...filters }),
    [page, sort, JSON.stringify(filters)],
    { initialData: { items: [], total: 0 }, fallbackError: 'Could not load products.' },
  );

  // Any filter change resets to page 1 — staying on page 4 of a narrower result
  // set is how you end up staring at an empty grid.
  const update = (mutate) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    next.delete('page');
    setSearchParams(next, { replace: false });
  };

  const toggleCategory = (value) =>
    update((next) => {
      const current = next.getAll('category');
      next.delete('category');
      const updated = current.includes(value)
        ? current.filter((c) => c !== value)
        : [...current, value];
      updated.forEach((c) => next.append('category', c));
    });

  const setParam = (key, value) =>
    update((next) => {
      if (value == null || value === '') next.delete(key);
      else next.set(key, value);
    });

  const clearAll = () => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    setSearchParams(next);
  };

  const products = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeCount =
    selectedCategories.length + (maxPrice ? 1 : 0) + (minRating ? 1 : 0) + (inStock ? 1 : 0) + (onSale ? 1 : 0);

  const categoryName = slug ? CATEGORIES.find((c) => c.slug === slug)?.name : null;
  const heading = categoryName ?? (query ? `Results for “${query}”` : 'All products');

  const goToPage = (next) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(next));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterPanel = (
    <div className="filters">
      <div className="filters__header">
        <h2>Filters</h2>
        {activeCount > 0 && (
          <button type="button" className="link-button" onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {!slug && (
        <fieldset className="filter-group">
          <legend>Category</legend>
          {CATEGORIES.map((category) => (
            <label key={category.slug} className="filter-option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.slug)}
                onChange={() => toggleCategory(category.slug)}
              />
              <span>{category.name}</span>
              <span className="filter-count">{facets.counts?.[category.slug] ?? 0}</span>
            </label>
          ))}
        </fieldset>
      )}

      <fieldset className="filter-group">
        <legend>Max price</legend>
        <input
          type="range"
          min={facets.minPrice ?? 0}
          max={facets.maxPrice ?? 2500}
          step={25}
          value={maxPrice ?? facets.maxPrice ?? 2500}
          onChange={(event) =>
            setParam(
              'maxPrice',
              Number(event.target.value) >= (facets.maxPrice ?? 2500) ? '' : event.target.value,
            )
          }
        />
        <p className="filter-readout">
          Up to <strong>{formatMoney(maxPrice ?? facets.maxPrice ?? 2500)}</strong>
        </p>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Rating</legend>
        {RATING_OPTIONS.map((value) => (
          <label key={value} className="filter-option">
            <input
              type="radio"
              name="rating"
              checked={Number(minRating) === value}
              onChange={() => setParam('rating', String(value))}
            />
            <span>{value}★ and up</span>
          </label>
        ))}
        {minRating && (
          <button type="button" className="link-button" onClick={() => setParam('rating', '')}>
            Any rating
          </button>
        )}
      </fieldset>

      <fieldset className="filter-group">
        <legend>Availability</legend>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setParam('inStock', inStock ? '' : '1')}
          />
          <span>In stock only</span>
        </label>
        <label className="filter-option">
          <input
            type="checkbox"
            checked={onSale}
            onChange={() => setParam('onSale', onSale ? '' : '1')}
          />
          <span>On sale</span>
        </label>
      </fieldset>
    </div>
  );

  return (
    <div className="shop">
      <Breadcrumbs
        trail={[
          { to: '/', label: 'Home' },
          { to: '/shop', label: 'Shop' },
          ...(categoryName ? [{ label: categoryName }] : []),
        ]}
      />

      <div className="shop__head">
        <div>
          <h1>{heading}</h1>
          <p className="shop__count">
            {status === 'loading' ? 'Loading…' : `${total} product${total === 1 ? '' : 's'}`}
          </p>
        </div>

        <div className="shop__controls">
          <button
            type="button"
            className="button-secondary filters-toggle"
            onClick={() => setFiltersOpen(true)}
          >
            <IoFilter /> Filters{activeCount > 0 ? ` (${activeCount})` : ''}
          </button>

          <label className="sort-control">
            <span className="visually-hidden">Sort by</span>
            <select value={sort} onChange={(event) => setParam('sort', event.target.value)}>
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {!slug && selectedCategories.length > 0 && (
        <div className="active-filters">
          {selectedCategories.map((value) => (
            <button
              key={value}
              type="button"
              className="chip"
              onClick={() => toggleCategory(value)}
            >
              {CATEGORIES.find((c) => c.slug === value)?.name ?? value} <IoClose />
            </button>
          ))}
        </div>
      )}

      <div className="shop__layout">
        <aside className="shop__sidebar">{filterPanel}</aside>

        {filtersOpen && (
          <div className="filters-sheet" role="dialog" aria-modal="true" aria-label="Filters">
            <div className="drawer-scrim" onClick={() => setFiltersOpen(false)} role="presentation" />
            <div className="filters-sheet__panel">
              <button
                type="button"
                className="link-button filters-sheet__close"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
              >
                <IoClose />
              </button>
              {filterPanel}
              <button
                type="button"
                className="button-primary"
                onClick={() => setFiltersOpen(false)}
              >
                Show {total} result{total === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        )}

        <div className="shop__results">
          {status === 'loading' && <SkeletonGrid count={PAGE_SIZE} />}
          {status === 'failed' && <ErrorMessage message={error} onRetry={reload} />}

          {status === 'succeeded' && products.length === 0 && (
            <div className="shop__empty">
              <Empty message="Nothing matches those filters." />
              <button type="button" className="button-secondary" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          )}

          {status === 'succeeded' && products.length > 0 && (
            <>
              <div className="products">
                {products.map((product) => (
                  <Product key={product.Product_id} product={product} />
                ))}
              </div>

              {pageCount > 1 && (
                <nav className="pagination" aria-label="Pagination">
                  <button
                    type="button"
                    className="button-secondary"
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {pageCount}
                  </span>
                  <button
                    type="button"
                    className="button-secondary"
                    disabled={page >= pageCount}
                    onClick={() => goToPage(page + 1)}
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {status === 'succeeded' && products.length === 0 && (
        <p className="shop__suggestion">
          Try <Link to="/shop">browsing everything</Link> instead.
        </p>
      )}
    </div>
  );
}
