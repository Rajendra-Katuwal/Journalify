import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PublicEntry from '../../components/social/PublicEntry';
import useJournal from '../../hooks/useJournal';
import { toast } from 'react-toastify';

const PublicFeedPage = () => {
  const [filter, setFilter] = useState('latest');
  const [publicEntries, setPublicEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getPublicEntries } = useJournal();

  useEffect(() => {
    const fetchPublicEntries = async () => {
      try {
        setIsLoading(true);
        const entries = await getPublicEntries(filter);
        setPublicEntries(entries);
      } catch (error) {
        toast.error(`Failed to load public entries: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicEntries();
  }, [getPublicEntries, filter]);

  return (
    // <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Public Journal Entries
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('latest')}
              className={`px-4 py-2 rounded-md ${filter === 'latest'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Latest
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-4 py-2 rounded-md ${filter === 'popular'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Popular
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-4 py-2 rounded-md ${filter === 'trending'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Trending
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : publicEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              No public entries yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Be the first to share your journal entry with the community!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {publicEntries.map((entry) => (
              <PublicEntry key={entry.id} entry={entry} />
            ))}

            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    // </MainLayout>
  );
};

export default PublicFeedPage;