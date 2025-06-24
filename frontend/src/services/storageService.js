import api from './api';

// Local storage functions
export const saveToLocal = (key, value) => {
  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getFromLocal = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (!value) return null;
    
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
};

export const removeFromLocal = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

export const clearLocal = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// API storage functions
export const uploadFile = async (file, type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  
  const response = await api.post('/storage/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await api.delete(`/storage/files/${fileId}`);
  return response.data;
};

export const getFiles = async (params = {}) => {
  const response = await api.get('/storage/files', { params });
  return response.data;
};