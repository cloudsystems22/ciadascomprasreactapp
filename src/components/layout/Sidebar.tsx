import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white p-5">
      <h1 className="text-xl font-bold mb-8">Cia das Compras</h1>

      <nav className="space-y-2">
        <Link className="block p-2 rounded hover:bg-slate-700" to="/">
          Dashboard
        </Link>
        <Link className="block p-2 rounded hover:bg-slate-700" to="/usuarios">
          Usuários
        </Link>
      </nav>
    </aside>
  );
}
