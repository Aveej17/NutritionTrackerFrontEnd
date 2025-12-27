import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/api';

type User = {
  id?: number;
  name: string;
  email: string;
  isPremium: boolean;
};

type LoginResponse = {
  token: string;
  name: string;
  email: string;
  isPrimeUser: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* Restore session on refresh */
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    restoreUser();
  }, []);

  const restoreUser = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setUser({
        id: res.data.id,
        name: res.data.name ?? '',
        email: res.data.email,
        isPremium: res.data.isPrimeUser,
      });
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  const login = async (data: LoginResponse) => {
    localStorage.setItem('token', data.token);

    setUser({
      name: data.name,
      email: data.email,
      isPremium: data.isPrimeUser,
    });
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
        loading,
      }}
    >
      {/* THIS was blocking your Login page */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
