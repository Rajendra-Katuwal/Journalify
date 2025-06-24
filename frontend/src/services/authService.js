import api from './api';

// Token management
export const setToken = (token) => {
  localStorage.setItem('journalify_token', token);
};

export const getToken = () => {
  return localStorage.getItem('journalify_token');
};

export const clearToken = () => {
  localStorage.removeItem('journalify_token');
};

// User authentication methods
export const register = async (userData) => {
  const response = await api.post('/auth/users/', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login/', credentials);
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
};

export const logout = () => {
  clearToken();
};

export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await api.post('/auth/reset-password', { token, password });
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    clearToken();
    console.log("Clearing");
    return null;
  }
};

export const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData);
  return response.data;
};

export const updatePassword = async (currentPassword, newPassword) => {
  const response = await api.put('/auth/password', { currentPassword, newPassword });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.post('/auth/verify-email', { token });
  return response.data;
};