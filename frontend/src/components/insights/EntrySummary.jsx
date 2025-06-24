import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import  useInsights  from '../../hooks/useInsights';

const EntrySummary = () => {
  const { getEntrySummaries } = useInsights();
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      setIsLoading(true);
      try {
        const data = await getEntrySummaries();
        setSummaries(data);
      } catch (error) {
        console.error('Error fetching entry summaries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, [getEntrySummaries]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!summaries || summaries.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          No entry summaries available yet. Write longer journal entries to get AI-powered summaries!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium p-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">
        Recent Entry Summaries
      </h3>
      
      <div className="divide-y dark:divide-gray-700">
        {summaries.map((summary, index) => (
          <div key={index} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Link 
                to={`/journal/entry/${summary.entryId}`}
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {summary.title || format(new Date(summary.date), 'MMMM d, yyyy')}
              </Link>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(summary.date), 'MMM d, yyyy')}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {summary.summary}
            </p>
            
            {summary.keyPoints && summary.keyPoints.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key points:
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc list-inside">
                  {summary.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntrySummary;