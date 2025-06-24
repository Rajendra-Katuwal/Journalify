import React, { createContext, useState, useEffect } from 'react';
import { 
  login, 
  register, 
  forgotPassword, 
  resetPassword, 
  logout, 
  getCurrentUser, 
  verifyEmail,
  getToken
} from '../services/authService';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }
    getCurrentUser()
      .then((currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }
      })
      .catch((err) => {
        setUser(null);
        console.error('Authentication check failed:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, password, firstname, lastname) => {
    setLoading(true);
    setError(null);
    try {
      const user = await register(email, password, firstname, lastname);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await forgotPassword(email);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      await resetPassword(token, newPassword);
    } catch (err) {
      setError(err.message || 'Password reset failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (token) => {
    setLoading(true);
    setError(null);
    try {
      await verifyEmail(token);
    } catch (err) {
      setError(err.message || 'Email verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    verifyEmail: handleVerifyEmail,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};