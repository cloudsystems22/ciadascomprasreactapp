import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../auth/AuthContext";

export default function PrivateLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar role={user?.role as "admin" | "buyer" | "seller"} />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
        <footer className="p-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Cia das Compras. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
