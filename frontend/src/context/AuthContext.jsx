import { createContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { storage } from "../utils/storage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const response = await authService.me();
        setUser(response.data.user);
        storage.setUser(response.data.user);
      } catch (_error) {
        storage.clearToken();
        storage.clearUser();
        setToken(null);
        setUser(null);
      } finally {
        setInitializing(false);
      }
    };
    bootstrapAuth();
  }, [token]);

  const login = ({ token: authToken, user: authUser }) => {
    setToken(authToken);
    setUser(authUser);
    storage.setToken(authToken);
    storage.setUser(authUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.clearToken();
    storage.clearUser();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      initializing,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [user, token, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
