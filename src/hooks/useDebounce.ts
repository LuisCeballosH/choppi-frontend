import { useRef } from "react";

export function useDebounce<T>(callback: (value: T) => void, delay: number) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return (value: T) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callback(value);
    }, delay);
  };
}
