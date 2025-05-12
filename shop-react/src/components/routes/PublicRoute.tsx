import { useAuth } from "@/hooks/useAuth.hook";
import type { JSX } from "@emotion/react/jsx-runtime";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}
