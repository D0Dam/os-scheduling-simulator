import { useEffect, useLayoutEffect, useRef } from 'react';

function useTimeout(callback: VoidFunction, delay: number | null, dependency?: unknown) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return () => {};
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay, dependency]);
}

export default useTimeout;
