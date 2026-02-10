import { createContext, useContext, useState } from "react";

type User = {
  id: number;
  name: string;
  role: "admin" | "buyer" | "seller";
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Para desenvolvimento, podemos iniciar com um usuário mockado
  const [user, setUser] = useState<User | null>({
    id: 6913,
    name: "Fornecedor Padrão",
    role: "seller",
  });

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
