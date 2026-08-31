import { useEffect, useState } from 'react';

// Holds a value back until it has stopped changing for `delay` ms — used so the
// suggestion dropdown does not fire a lookup on every keystroke.
export function useDebounced(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
