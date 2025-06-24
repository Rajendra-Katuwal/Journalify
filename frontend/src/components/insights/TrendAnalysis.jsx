import React, { useState, useEffect } from 'react';
import  useInsights  from '../../hooks/useInsights';

const TrendAnalysis = () => {
  const { getTrends } = useInsights();
  const [trends, setTrends] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      try {
        const data = await getTrends();
        setTrends(data);
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
  }, [getTrends]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!trends) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          Not enough data to analyze trends. Keep journaling regularly to see insights!
        </p>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
        );
      case 'decreasing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
          </svg>
        );
      case 'stable':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
        Your Journaling Insights
      </h3>
      
      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.title} className="flex items-center justify-between">
            <div className="flex items-center">
              {getTrendIcon(trend.trend)}
              <p className="ml-2 text-gray-600 dark:text-gray-300">{trend.title}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{trend.value}</p>
          </div>
        ))}
        </div>
    </div>
    )
}

export default TrendAnalysis;