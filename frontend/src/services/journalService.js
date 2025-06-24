import api from './api';

export const getEntries = async (params = {}) => {
  const response = await api.get('/entries', { params });
  return response.data;
};

export const getEntry = async (entryId) => {
  const response = await api.get(`/entries/${entryId}`);
  return response.data;
};

export const createEntry = async (entryData) => {
  const response = await api.post('/entries', entryData);
  return response.data;
};

export const updateEntry = async (entryId, entryData) => {
  const response = await api.put(`/entries/${entryId}`, entryData);
  return response.data;
};

export const deleteEntry = async (entryId) => {
  const response = await api.delete(`/entries/${entryId}`);
  return response.data;
};

export const getEntryTags = async () => {
  const response = await api.get('/entries/tags');
  return response.data;
};

export const uploadMedia = async (formData) => {
  const response = await api.post('/entries/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getEntryByDate = async (date) => {
  const response = await api.get(`/entries/date/${date}`);
  return response.data;
};

export const toggleEntryPublicity = async (entryId, isPublic) => {
  const response = await api.patch(`/entries/${entryId}/publicity`, { isPublic });
  return response.data;
};

export const getPublicEntries = async (params = {}) => {
  const response = await api.get('/entries/public', { params });
  return response.data;
};

export const getEntryComments = async (entryId) => {
  const response = await api.get(`/entries/${entryId}/comments`);
  return response.data;
};

export const addEntryComment = async (entryId, comment) => {
  const response = await api.post(`/entries/${entryId}/comments`, { comment });
  return response.data;
};

export const deleteEntryComment = async (entryId, commentId) => {
  const response = await api.delete(`/entries/${entryId}/comments/${commentId}`);
  return response.data;
};

export const upvoteEntry = async (entryId) => {
  const response = await api.post(`/entries/${entryId}/upvote`);
  return response.data;
};

export const shareEntry = async (entryId) => {
  const response = await api.post(`/entries/${entryId}/share`);
  return response.data;
};

export const getSharedEntry = async (shareToken) => {
  const response = await api.get(`/entries/shared/${shareToken}`);
  return response.data;
};