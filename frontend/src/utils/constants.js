// App Configuration
export const APP_NAME = 'Journalify';
export const APP_VERSION = '1.0.0';

// Authentication
export const AUTH_TOKEN_KEY = 'journalify_token';
export const USER_DATA_KEY = 'journalify_user';
export const AUTH_EXPIRY_KEY = 'journalify_expiry';

// Mood Types
export const MOOD_TYPES = {
  VERY_HAPPY: { id: 5, label: 'Very Happy', icon: '😁', color: '#10b981' },
  HAPPY: { id: 4, label: 'Happy', icon: '😊', color: '#60a5fa' },
  NEUTRAL: { id: 3, label: 'Neutral', icon: '😐', color: '#d1d5db' },
  SAD: { id: 2, label: 'Sad', icon: '😔', color: '#f59e0b' },
  VERY_SAD: { id: 1, label: 'Very Sad', icon: '😢', color: '#ef4444' },
};

// Entry Types
export const ENTRY_TYPES = {
  FULL: 'full',
  MICRO: 'micro',
};

// Default Tags
export const DEFAULT_TAGS = [
  'Work', 'Personal', 'Health', 'Relationships', 'Creativity', 
  'Learning', 'Goals', 'Gratitude', 'Challenges'
];

// Date Formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DISPLAY_DATE_FORMAT = 'MMM D, YYYY';
export const DISPLAY_TIME_FORMAT = 'h:mm A';
export const DISPLAY_DATETIME_FORMAT = 'MMM D, YYYY [at] h:mm A';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// Animations
export const ANIMATION_DURATION = 300;

// LocalStorage Keys
export const THEME_KEY = 'journalify_theme';
export const SETTINGS_KEY = 'journalify_settings';
export const DRAFT_ENTRY_KEY = 'journalify_draft_entry';

// API Endpoints (for reference)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    ME: '/auth/me',
  },
  ENTRIES: {
    BASE: '/entries',
    SINGLE: (id) => `/entries/${id}`,
    COMMENTS: (id) => `/entries/${id}/comments`,
    MEDIA: '/entries/media',
    PUBLIC: '/entries/public',
    SHARED: (token) => `/entries/shared/${token}`,
    TAGS: '/entries/tags',
  },
  INSIGHTS: {
    MOOD: '/insights/mood',
    KEYWORDS: '/insights/keywords',
    SUMMARY: (id) => `/insights/summary/${id}`,
    PERIOD_SUMMARY: '/insights/period-summary',
    TRENDS: '/insights/trends',
    SMART_PROMPTS: '/insights/smart-prompts',
    GENERATE_TAGS: '/insights/generate-tags',
    ANALYZE_SENTIMENT: '/insights/analyze-sentiment',
  },
  STORAGE: {
    UPLOAD: '/storage/upload',
    FILES: '/storage/files',
  },
};