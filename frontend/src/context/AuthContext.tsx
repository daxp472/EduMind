import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, getAuthToken } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  subscriptionPlan?: string;
  usageCount?: number;
  usageLimit?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('edumind_user');
    const token = getAuthToken();
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setAuthToken(token);
      
      // Fetch fresh user data
      authAPI.getCurrentUser(token)
        .then(response => {
          setUser(response.data);
          localStorage.setItem('edumind_user', JSON.stringify(response.data));
        })
        .catch(err => {
          console.error('Failed to fetch user data:', err);
          logout(); // Logout if token is invalid
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      setUser(response.data);
      setAuthToken(response.token);
      
      localStorage.setItem('edumind_user', JSON.stringify(response.data));
      localStorage.setItem('edumind_token', response.token);
      
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message || 'Login failed');
      } else {
        throw new Error('Login failed');
      }
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authAPI.register({ name, email, password });
      
      setUser(response.data);
      setAuthToken(response.token);
      
      localStorage.setItem('edumind_user', JSON.stringify(response.data));
      localStorage.setItem('edumind_token', response.token);
      
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        throw new Error(error.message || 'Registration failed');
      } else {
        throw new Error('Registration failed');
      }
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('edumind_user');
    localStorage.removeItem('edumind_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};