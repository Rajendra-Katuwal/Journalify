import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import MinimalLayout from '../../layouts/MinimalLayout';
import CommentSection from '../../components/social/CommentSection';
import useJournal from '../../hooks/useJournal';
import { toast } from 'react-toastify';

const SharedEntryPage = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getSharedEntry } = useJournal();

  useEffect(() => {
    const fetchSharedEntry = async () => {
      try {
        setIsLoading(true);
        const fetchedEntry = await getSharedEntry(shareId);
        if (!fetchedEntry) {
          setError('This journal entry does not exist or is no longer shared');
          return;
        }
        setEntry(fetchedEntry);
      } catch (err) {
        setError('Failed to load the shared journal entry');
        toast.error('Failed to load the shared journal entry');
      } finally {
        setIsLoading(false);
      }
    };

    if (shareId) {
      fetchSharedEntry();
    } else {
      setError('Invalid share link');
    }
  }, [shareId, getSharedEntry]);

  const getMoodEmoji = (mood) => {
    const moods = {
      5: '😁', // Very Happy
      4: '🙂', // Happy
      3: '😐', // Neutral
      2: '😔', // Sad
      1: '😢', // Very Sad
    };
    return moods[mood] || '😐';
  };

  if (isLoading) {
    return (
      // <MinimalLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      // </MinimalLayout>
    );
  }

  if (error) {
    return (
      // <MinimalLayout>
        <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The entry you're looking for might have been removed or set to private.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      // </MinimalLayout>
    );
  }

  return (
    // <MinimalLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {entry.authorAvatar ? (
                  <img
                    src={entry.authorAvatar}
                    alt={entry.authorName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                      {entry.authorName?.charAt(0).toUpperCase() || "J"}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    {entry.authorName || "Anonymous Journaler"}
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.createdAt && format(new Date(entry.createdAt), 'MMMM d, yyyy • h:mm a')}
                  </div>
                </div>
              </div>

              {entry.mood && (
                <div className="text-2xl" title={`Mood: ${entry.mood}/5`}>
                  {getMoodEmoji(entry.mood)}
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {entry.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: entry.content }}></div>
            </div>

            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {entry.media && entry.media.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {entry.media.map((item) => (
                  <div key={item.id} className="rounded-lg overflow-hidden">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt="Journal attachment"
                        className="w-full h-32 object-cover"
                      />
                    ) : item.type === 'audio' ? (
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 h-32 flex items-center justify-center">
                        <audio controls src={item.url} className="w-full" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <CommentSection entryId={entry.id} />
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Want to start your own journal?
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Journalify Today
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This entry was shared via Journalify - A modern, AI-powered journal app
          </p>
          <div className="mt-2">
            <a
              href="/"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    // </MinimalLayout>
  );
};

export default SharedEntryPage;