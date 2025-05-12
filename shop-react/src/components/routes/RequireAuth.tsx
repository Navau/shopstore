import { useAuth } from "@/hooks/useAuth.hook";
import type { JSX } from "@emotion/react/jsx-runtime";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
