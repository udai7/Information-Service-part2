import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { apiClient, Admin, Department } from "../types/api";

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isDepartmentAdmin: boolean;
  department: Department | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
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

  const refreshAuth = useCallback(async () => {
    try {
      const result = await apiClient.refreshToken();
      if (result.token && result.admin) {
        setToken(result.token);
        setAdmin(result.admin);
        apiClient.setToken(result.token);
      }
    } catch {
      // Refresh failed, clear auth state
      setAdmin(null);
      setToken(null);
      apiClient.clearToken();
    }
  }, []);

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
            // Token is invalid, try refresh
            await refreshAuth();
          }
        } catch {
          // Token invalid, try refresh
          try {
            await refreshAuth();
          } catch {
            localStorage.removeItem("admin_token");
            apiClient.clearToken();
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [refreshAuth]);

  // Set up token refresh interval (every 12 minutes for 15min tokens)
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      try {
        await refreshAuth();
      } catch {
        // Silent fail, will be caught on next API call
      }
    }, 12 * 60 * 1000); // 12 minutes

    return () => clearInterval(interval);
  }, [token, refreshAuth]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.login({ email, password });

    if (response.admin && response.token) {
      setAdmin(response.admin);
      setToken(response.token);
      apiClient.setToken(response.token);
      localStorage.setItem("admin_token", response.token);
    } else {
      throw new Error("Invalid response from server");
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch {
      // Continue with local cleanup even if server call fails
    }
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("admin_token");
    apiClient.clearToken();
  };

  const isSuperAdmin = admin?.role === "super_admin";
  const isDepartmentAdmin = admin?.role === "department_admin";
  const department = admin?.department || null;

  const value: AuthContextType = {
    admin,
    token,
    isLoading,
    isSuperAdmin,
    isDepartmentAdmin,
    department,
    login,
    logout,
    isAuthenticated: !!admin && !!token,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
