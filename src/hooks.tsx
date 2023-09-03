import { useState, useEffect } from "react";

function useLocalStorage<TData>(key: string, defaultValue: TData) {
  const [value, setValue] = useState<TData>(() => {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : defaultValue;
  });

  useEffect(() => {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }, [key, value]);

  return [value, setValue] as const;
}

export { useLocalStorage };
