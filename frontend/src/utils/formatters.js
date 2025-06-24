import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { 
  DATE_FORMAT, 
  TIME_FORMAT, 
  DATETIME_FORMAT, 
  DISPLAY_DATE_FORMAT, 
  DISPLAY_TIME_FORMAT, 
  DISPLAY_DATETIME_FORMAT 
} from './constants';

/**
 * Formats a date string or Date object to display format
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return format(dateObj, DISPLAY_DATE_FORMAT);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Formats a time string or Date object to display format
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  try {
    const timeObj = new Date(time);
    return format(timeObj, DISPLAY_TIME_FORMAT);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * Formats a datetime string or Date object to display format
 */
export const formatDateTime = (datetime) => {
  if (!datetime) return '';
  
  try {
    const datetimeObj = new Date(datetime);
    return format(datetimeObj, DISPLAY_DATETIME_FORMAT);
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '';
  }
};

/**
 * Formats a datetime string or Date object to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (datetime) => {
  if (!datetime) return '';

  try {
    const dateObj = new Date(datetime);
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

/**
 * Returns a user-friendly date string (Today, Yesterday, or formatted date)
 */
export const getFriendlyDate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    
    if (isToday(dateObj)) {
      return 'Today';
    } else if (isYesterday(dateObj)) {
      return 'Yesterday';
    } else {
      return format(dateObj, DISPLAY_DATE_FORMAT);
    }
  } catch (error) {
    console.error('Error getting friendly date:', error);
    return '';
  }
};

/**
 * Truncates text to a specified length and adds ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Formats a number to include commas (e.g., 1,000)
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '';
  return num.toLocaleString();
};

/**
 * Formats a number as a percentage
 */
export const formatPercentage = (num, decimals = 1) => {
  if (num === undefined || num === null) return '';
  return `${(num * 100).toFixed(decimals)}%`;
};

/**
 * Returns the first letter of each word in a string (for avatars)
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Formats bytes to a human-readable file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};