'use client';

import { api } from '@/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      await api.post('/auth/refresh');
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await api.delete('/auth/logout');
    } finally {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshAuth().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within AuthContextProvider');
  return context;
}
