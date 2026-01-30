import { Outlet } from "react-router-dom";
import PublicHeader from "../header/PublicHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-100">
      <PublicHeader />
      
      <main className="flex-1 relative w-full h-full">
        <Outlet />
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm">
        © 2026 Cia das Compras. Todos os direitos reservados.
      </footer>
    </div>
  );
}
