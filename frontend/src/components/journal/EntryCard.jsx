import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EntryCard = ({ entry }) => {
  const { id, title, content, createdAt, mood, tags } = entry;
  
  // Truncate content for preview
  const previewContent = content.length > 120 
    ? content.substring(0, 120) + '...' 
    : content;
  
  // Map mood to emoji for quick visual reference
  const moodEmojis = {
    happy: '😊',
    sad: '😔',
    neutral: '😐',
    excited: '🎉',
    angry: '😠',
    anxious: '😰',
    relaxed: '😌'
  };

  const moodEmoji = moodEmojis[mood] || '📝';
  
  return (
    <Link to={`/journal/entry/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 mb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">
            {title || format(new Date(createdAt), 'PPP')}
          </h3>
          <span className="text-2xl" title={`Mood: ${mood}`}>
            {moodEmoji}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
          {previewContent}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {tags && tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {format(new Date(createdAt), 'MMM d, yyyy • h:mm a')}
        </div>
      </div>
    </Link>
  );
};

export default EntryCard;