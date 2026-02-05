import { Routes, Route } from "react-router-dom";
import PublicLayout from "../components/layouts/PublicLayout";
import PrivateLayout from "../components/layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import DashboardBuyer from "../pages/buyers/DashboardBuyer";
import DashboardSeller from "../pages/sellers/DashboardSeller";
import SellerQuotes from "../pages/sellers/Quotes";
import QuoteDetail from "../pages/sellers/QuoteDetail";
import QuoteDetails from "../pages/sellers/QuoteDetails";
import CotacoesPages from "../pages/admin/CotacoesPages";
import OrderDetails from "../pages/shared/OrderDetails";

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
          path="/admin/cotacoes"
          element={
            <ProtectedRoute role="admin">
              <CotacoesPages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute role="buyer">
              <DashboardBuyer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller"
          element={
            <ProtectedRoute role="seller">
              <DashboardSeller />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/quotes"
          element={
            <ProtectedRoute role="seller">
              <SellerQuotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/quotes/detail/:id"
          element={
            <ProtectedRoute role="seller">
              <QuoteDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/quotes/details"
          element={
            <ProtectedRoute role="seller">
              <QuoteDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
