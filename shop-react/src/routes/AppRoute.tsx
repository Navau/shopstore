import { PublicRoute } from "@/components/routes/PublicRoute";
import { RequireAuth } from "@/components/routes/RequireAuth";
import { Home, Login, Profile, Register } from "@/pages";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { OrderDetail } from "@/pages/OrderDetail";
import { ResetPassword } from "@/pages/ResetPassword";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout, MainLayout } from "../layouts";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>

      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
