import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiChevronRight } from 'react-icons/fi';
import { JournalContext } from '../contexts/JournalContext';
import { formatDistanceToNow } from 'date-fns';

const RecentEntries = () => {
  const { entries, fetchEntries } = useContext(JournalContext);
  const [loading, setLoading] = useState(true);
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      try {
        if (entries.length === 0) {
          await fetchEntries({ limit: 5, sort: 'createdAt' });
        }
        // Get 5 most recent entries
        const recent = [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentEntries(recent);
      } catch (error) {
        console.error('Error loading recent entries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [entries, fetchEntries]);

  const truncateText = (text, maxLength = 85) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Entries</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-start">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentEntries.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Entries</h3>
        <div className="py-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No entries yet. Start journaling today!</p>
          <Link
            to="/journal/new"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create your first entry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Entries</h3>
        <Link
          to="/journal"
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center"
        >
          View all
          <FiChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="space-y-4">
        {recentEntries.map((entry) => (
          <Link
            key={entry.id}
            to={`/journal/entry/${entry.id}`}
            className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition duration-150"
          >
            <div className={`p-2 rounded-md flex items-center justify-center ${entry.mood ? `bg-${entry.mood.color}-100 dark:bg-${entry.mood.color}-900` : 'bg-gray-100 dark:bg-gray-700'}`}>
              {entry.mood ? (
                <span className="text-xl">{entry.mood.emoji}</span>
              ) : (
                <FiClock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {truncateText(entry.content)}
              </p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {entry.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center mr-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    >
                      {tag}
                    </span>
                  ))}
                  {entry.tags.length > 2 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      +{entry.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentEntries;