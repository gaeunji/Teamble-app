import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔐 AuthProvider: Initializing...");

    // 개발 중에는 항상 로그아웃 상태로 시작
    const initializeAuth = async () => {
      try {
        console.log("🔐 AuthProvider: Setting up initial state...");
        setIsAuthenticated(false);
        console.log("🔐 AuthProvider: Initial state set to logged out");
      } catch (error) {
        console.log("Auth initialization failed:", error);
        setIsAuthenticated(false);
      } finally {
        console.log("🔐 AuthProvider: Loading completed");
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = () => {
    console.log("🔐 AuthProvider: Login called");
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("🔐 AuthProvider: Logout called");
    setIsAuthenticated(false);
  };

  console.log("🔐 AuthProvider: Rendering with state:", {
    isAuthenticated,
    isLoading,
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
