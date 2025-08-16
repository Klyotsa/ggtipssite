import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
  avatar_base64?: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (login: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = "/backend/api"; // если фронт и бэкенд на одном домене

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsAuthLoading(false);
    // Listen for changes in localStorage (e.g., login/logout in another tab)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'user') {
        const updatedUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(updatedUser);
        setIsAuthenticated(!!updatedUser);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = async (login: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
        credentials: 'include', // для поддержки сессий PHP
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      console.log('Starting registration for:', { email, username });
      
      const response = await fetch(`${API_BASE_URL}/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
      
      console.log('Registration response status:', response.status);
      const data = await response.json();
      console.log('Registration response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      // После успешной регистрации можно сразу залогинить пользователя (или получить его данные)
      const newUser = {
        id: data.user_id?.toString() || '',
        email,
        username,
        avatar: null,
      };
      
      console.log('Setting new user:', newUser);
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      console.log('Registration completed successfully');
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, isAuthenticated, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 