import api from './api';

export const getMoodAnalytics = async (params = {}) => {
  const response = await api.get('/insights/mood', { params });
  return response.data;
};

export const getKeywordAnalytics = async (params = {}) => {
  const response = await api.get('/insights/keywords', { params });
  return response.data;
};

export const getEntrySummary = async (entryId) => {
  const response = await api.get(`/insights/summary/${entryId}`);
  return response.data;
};

export const getPeriodSummary = async (params = {}) => {
  const response = await api.get('/insights/period-summary', { params });
  return response.data;
};

export const getSmartPrompts = async () => {
  const response = await api.get('/insights/smart-prompts');
  return response.data;
};

export const getTrends = async (params = {}) => {
  const response = await api.get('/insights/trends', { params });
  return response.data;
};

export const generateSmartTags = async (content) => {
  const response = await api.post('/insights/generate-tags', { content });
  return response.data;
};

export const analyzeSentiment = async (content) => {
  const response = await api.post('/insights/analyze-sentiment', { content });
  return response.data;
};

export const compareEntries = async (params = {}) => {
  const response = await api.get('/insights/compare', { params });
  return response.data;
};