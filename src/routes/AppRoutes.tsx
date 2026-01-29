import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layouts/PublicLayout";
import PrivateLayout from "../components/layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import DashboardBuyer from "../pages/buyers/DashboardBuyer";
import DashboardSeller from "../pages/sellers/DashboardSeller";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Público */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Privado */}
      <Route element={<PrivateLayout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comprador"
          element={
            <ProtectedRoute role="comprador">
              <DashboardBuyer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendedor"
          element={
            <ProtectedRoute role="vendedor">
              <DashboardSeller />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
