import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { formatDate } from '../../utils/formatters';

const PublicEntry = ({ entry, onLike, showActions = true }) => {
  if (!entry) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-medium text-gray-600 dark:text-gray-300">
            {entry.author?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800 dark:text-gray-200">{entry.author?.username || 'Anonymous'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(entry.createdAt)}</p>
          </div>
        </div>
        {entry.mood && (
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm">
            {entry.mood}
          </div>
        )}
      </div>
      
      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{entry.title}</h2>
      
      <div className="prose dark:prose-invert max-w-none mb-4">
        {entry.content.length > 300 ? (
          <>
            <p>{entry.content.substring(0, 300)}...</p>
            <Link to={`/shared/${entry.id}`} className="text-blue-600 dark:text-blue-400 font-medium">
              Read more
            </Link>
          </>
        ) : (
          <p>{entry.content}</p>
        )}
      </div>
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {showActions && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onLike(entry.id)}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              {entry.likes || 0}
            </button>
            <Link 
              to={`/shared/${entry.id}`} 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {entry.comments?.length || 0}
            </Link>
          </div>
          <Button 
            variant="text" 
            size="sm"
            to={`/shared/${entry.id}`}
          >
            View Full Entry
          </Button>
        </div>
      )}
    </div>
  );
};

export default PublicEntry;