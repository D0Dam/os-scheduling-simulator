import { useEffect, useLayoutEffect, useRef } from 'react';

export function useInterval(
  callback: VoidFunction,
  delay: number | null,
  dependencies: unknown[] = []
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === 0) {
      return () => {};
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, ...dependencies]);
}
