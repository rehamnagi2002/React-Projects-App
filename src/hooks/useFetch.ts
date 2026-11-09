import { useEffect, useMemo, useState } from "react";

export type FetchState<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: T };

type Settled<T> = {
  request: object;
  state: Exclude<FetchState<T>, { status: "loading" }>;
};

// `fetcher` must be referentially stable (module function or useCallback).
export function useFetch<T>(
  fetcher: () => Promise<T>,
): [FetchState<T>, () => void] {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  // A new token per fetcher/retry; results for older tokens count as loading.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const request = useMemo(() => ({}), [fetcher, attempt]);

  useEffect(() => {
    let ignore = false;
    fetcher().then(
      (data) => {
        if (!ignore) setSettled({ request, state: { status: "ready", data } });
      },
      (err: unknown) => {
        if (ignore) return;
        const error =
          err instanceof Error ? err.message : "Something went wrong.";
        setSettled({ request, state: { status: "error", error } });
      },
    );
    return () => {
      ignore = true;
    };
  }, [fetcher, request]);

  const loading: FetchState<T> = { status: "loading" };
  const state = settled?.request === request ? settled.state : loading;
  return [state, () => setAttempt((a) => a + 1)];
}
