import type { ComponentType } from "react";
import { getDisplayName } from "./getDisplayName";

interface LoadingProps {
  isLoading: boolean;
}

export function withLoading<P extends object>(Component: ComponentType<P>) {
  function WithLoading({ isLoading, ...rest }: P & LoadingProps) {
    if (isLoading) {
      return <p role="status">Loading...</p>;
    }
    // Rest of an intersection with a generic is not narrowed by TS.
    return <Component {...(rest as unknown as P)} />;
  }

  WithLoading.displayName = `withLoading(${getDisplayName(Component)})`;
  return WithLoading;
}
