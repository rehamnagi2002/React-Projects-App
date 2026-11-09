import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import type { Role } from "../types";
import { getDisplayName } from "./getDisplayName";

interface WithAuthOptions {
  role?: Role;
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {},
) {
  function WithAuth(props: P) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (options.role && user.role !== options.role) {
      return <p role="alert">You do not have access to this page.</p>;
    }
    return <Component {...props} />;
  }

  WithAuth.displayName = `withAuth(${getDisplayName(Component)})`;
  return WithAuth;
}
