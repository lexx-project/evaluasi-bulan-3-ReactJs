import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "@/components/hooks/useAuth";

interface PrivateRouteProps {
  children: ReactElement;
  redirectTo?: string;
  allowedRoles?: Array<"user" | "admin">;
}

export default function PrivateRoute({
  children,
  redirectTo = "/login",
  allowedRoles,
}: PrivateRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
