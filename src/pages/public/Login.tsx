import { useAuth } from "../../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade e a transição

  useEffect(() => {
    setIsVisible(true); // Ativa a transição após a montagem do componente
  }, []);

  function handleLogin(event: React.FormEvent) {
    event.preventDefault(); // Prevent default form submission
    // Aqui você normalmente obteria o e-mail/senha do estado do formulário
    // Por enquanto, manteremos o login fixo
    login({ name: "David", role: "admin" });
    navigate("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Formulário de login centralizado com transição suave */}
      <main className="flex-grow flex items-center justify-center p-4 z-10 mt-24">
        <div className="w-full max-w-md">
          <div className={`bg-white rounded-2xl shadow-xl p-8 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-tl from-blue-600 to-cyan-400 mb-2">Welcome back</h3>
              <p className="text-sm text-gray-400 font-bold mt-2">Entre com seu e-mail e senha para acessar</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-4">
                <input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-6 flex items-center">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input 
                        type="checkbox" 
                        name="toggle" 
                        id="toggle" 
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${rememberMe ? 'translate-x-5 border-blue-600' : 'border-gray-300'}`}
                    />
                    <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${rememberMe ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                </div>
                <label htmlFor="toggle" className="text-xs font-bold text-gray-500 cursor-pointer uppercase">Remember me</label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-tl from-blue-600 to-cyan-400 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 uppercase text-xs tracking-wide"
              >
                SIGN IN
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/cadastro" className="text-blue-600 font-bold hover:text-blue-800 transition-colors bg-clip-text text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
