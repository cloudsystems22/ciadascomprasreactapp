import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900 text-white p-4">
        Sidebar
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">Header do Sistema</header>

        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>

        <footer className="bg-gray-200 p-3 text-center">
          Sistema interno
        </footer>
      </div>
    </div>
  );
}
