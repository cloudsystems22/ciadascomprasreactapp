import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">Cia das Compras</header>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        © 2026 Cia das Compras
      </footer>
    </div>
  );
}
