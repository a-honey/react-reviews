import { useCallback, useState } from "react";

export function useAsync(getfunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappFunction = useCallback(
    async (...args) => {
      setPending(true);
      setError(null);
      try {
        return await getfunction(...args);
      } catch (error) {
        setError(error);
      } finally {
        setPending(false);
      }
    },
    [getfunction]
  );

  return [pending, error, wrappFunction];
}

export default useAsync;
