import { useCallback, useEffect, useState } from 'react';
import { errorMessage } from './api';

// Runs an async function on mount and whenever `deps` change, discarding the
// result of any call that a newer one has superseded. Returns a `reload` for
// retry buttons and post-mutation refreshes.
export function useAsync(fn, deps = [], { initialData = null, fallbackError } = {}) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    Promise.resolve()
      .then(fn)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus('succeeded');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(errorMessage(err, fallbackError));
        setStatus('failed');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, status, error, reload, setData };
}
