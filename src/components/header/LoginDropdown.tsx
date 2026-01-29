// d:\david\repos\ciadascomprasreactapp\src\components\header\LoginDropdown.tsx
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition cursor-pointer focus:outline-none"
      >
        <FontAwesomeIcon icon={faUsers} />
        <span className="font-bold text-sm">Acesso</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-md shadow-xl z-50 p-4 border border-gray-200">
          <h4 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
            Acesso ao sistema
          </h4>
          
          <form action="sys/logar.php" method="post">
            <div className="mb-3">
              <input
                required
                type="email"
                name="login"
                placeholder="Usuário do sistema..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex">
              <input
                required
                type="password"
                name="senha"
                placeholder="Senha..."
                className="w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 z-10"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r text-sm font-medium transition whitespace-nowrap"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
