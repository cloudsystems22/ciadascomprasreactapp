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
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Pricing from "../pages/public/Pricing";
import RegisterSeller from "../pages/public/RegisterSeller";
import RegisterBuyer from "../pages/public/RegisterBuyer";
import FAQ from "../pages/public/FAQ";
import HowItWorks from "../pages/public/HowItWorks";
import Suppliers from "../pages/public/Suppliers";
import PrivacyPolicy from "../pages/public/PrivacyPolicy"
import CiapagSeller from "../pages/sellers/CiapagSeller";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Público */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/planos" element={<Pricing />} />
        <Route path="/cadastro" element={<RegisterBuyer />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/fornecedores" element={<Suppliers />} />
        <Route path="/funcionalidades" element={<HowItWorks />} />
        <Route path="/privacidade" element={<PrivacyPolicy />} />
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

        <Route
          path="/seller/ciapag"
          element={
            <ProtectedRoute role="seller">
              <CiapagSeller />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
