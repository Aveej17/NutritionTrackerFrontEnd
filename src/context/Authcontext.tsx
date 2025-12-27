import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/api';

type User = {
  id: number;
  email: string;
  isPremium: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  /* Restore session on refresh */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMe();
    }
  }, []);

  const fetchMe = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setUser(res.data);
    } catch {
      logout();
    }
  };

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    await fetchMe();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
