import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient, Admin, AuthResponse } from "../types/api";

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token"),
  );
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("admin_token");
      if (savedToken) {
        try {
          apiClient.setToken(savedToken);
          const response = await apiClient.getProfile();
          if (response.admin) {
            setAdmin(response.admin);
            setToken(savedToken);
          } else {
            // Token is invalid
            localStorage.removeItem("admin_token");
            apiClient.clearToken();
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("admin_token");
          apiClient.clearToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await apiClient.login({ email, password });

      if (response.admin && response.token) {
        setAdmin(response.admin);
        setToken(response.token);
        apiClient.setToken(response.token);
        localStorage.setItem("admin_token", response.token);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response: AuthResponse = await apiClient.register({
        email,
        password,
        name,
      });

      if (response.admin && response.token) {
        setAdmin(response.admin);
        setToken(response.token);
        apiClient.setToken(response.token);
        localStorage.setItem("admin_token", response.token);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("admin_token");
    apiClient.clearToken();
  };

  const value: AuthContextType = {
    admin,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!admin && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
