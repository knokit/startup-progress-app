import { useState, useEffect, useCallback } from "react";

interface AsyncState<TData, TError = unknown> {
  data: TData | null;
  error: TError | null;
  status: "idle" | "pending" | "success" | "error";
}

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

function useAsync<TData, TError = { message?: string }>() {
  const [state, setState] = useState<AsyncState<TData, TError>>({
    data: null,
    error: null,
    status: "idle",
  });

  const { data, error, status } = state;

  const run = useCallback((promise: Promise<TData>) => {
    setState((prevState) => ({ ...prevState, status: "pending" }));
    promise.then(
      (data) =>
        setState((prevState) => ({ ...prevState, status: "success", data })),
      (error) =>
        setState((prevState) => ({ ...prevState, status: "error", error }))
    );
  }, []);

  return {
    run,
    data,
    error,
    status,
    setState,
  };
}

export { useLocalStorage, useAsync };
