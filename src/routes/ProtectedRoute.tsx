import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role?: "admin" | "buyer" | "seller";
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}
