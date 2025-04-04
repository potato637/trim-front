import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextI {
  isLoggedIn: boolean;
  setAuth: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean }>>;
}

export const AuthContext = createContext<AuthContextI | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ isLoggedIn: boolean }>({
    isLoggedIn: false,
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn: auth.isLoggedIn, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
