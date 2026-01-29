import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function PublicHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full shadow-sm border-b border-gray-200">
      {/* TOP BAR */}
      <div className="bg-slate-900 text-gray-200 text-sm">
        <div className="w-full px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              📞 <span>+55 (19) 3212-1373</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              ✉️ <span>webmaster@ciadascompras.com.br</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-1.5 rounded-md text-white font-semibold text-xs"
              >
                Acesso ao sistema
              </Link>
            ) : (
              <>
                <span className="hidden sm:block text-gray-300">
                  Bem-vindo, <b className="text-white">{user.name}</b>
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-md text-white text-xs"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="bg-white">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Cia das Compras"
              className="h-10 object-contain"
            />
          </Link>

          {/* MENU */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link className="hover:text-blue-600 transition" to="/">Home</Link>
            <Link className="hover:text-blue-600 transition" to="/cadastro">Cadastro</Link>
            <Link className="hover:text-blue-600 transition" to="/como-funciona">Como funciona</Link>
            <Link className="hover:text-blue-600 transition" to="/fornecedores">Fornecedores</Link>
            <Link className="hover:text-blue-600 transition" to="/faq">Perguntas</Link>
            <Link className="hover:text-blue-600 transition" to="/contato">Contato</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
