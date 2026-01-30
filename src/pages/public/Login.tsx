import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission
    // Aqui você normalmente obteria o e-mail/senha do estado do formulário
    // Por enquanto, manteremos o login fixo
    login({ name: "David", role: "admin" });
    navigate("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="absolute top-0 h-1/2 w-full bg-cover bg-center" style={{ backgroundImage: "url('https://demos.creative-tim.com/soft-ui-dashboard-react/static/media/curved9.jpg')" }}>
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-blue-600 to-cyan-400 opacity-60"></span>
      </div>
      <main className="relative flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
              <p className="text-sm text-gray-500 mt-2">Entre com seu e-mail e senha</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-600 mb-2" htmlFor="password">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-tl from-blue-600 to-cyan-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                ENTRAR
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
