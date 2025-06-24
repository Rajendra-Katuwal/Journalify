import React, { useState, useEffect } from 'react';
import  useInsights  from '../../hooks/useInsights';

const KeywordCloud = ({ period = 'month' }) => {
  const { getKeywords } = useInsights();
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      setIsLoading(true);
      try {
        const data = await getKeywords(period);
        setKeywords(data);
      } catch (error) {
        console.error('Error fetching keywords:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeywords();
  }, [getKeywords, period]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!keywords || keywords.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          Not enough data to generate keywords. Keep journaling to see frequent topics!
        </p>
      </div>
    );
  }

  // Font sizes based on frequency
  const minFontSize = 12;
  const maxFontSize = 24;
  const maxFrequency = Math.max(...keywords.map(k => k.frequency));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
        Popular Topics
      </h3>
      
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4 py-6">
        {keywords.map((keyword, i) => {
          const fontSize = minFontSize + 
            ((keyword.frequency / maxFrequency) * (maxFontSize - minFontSize));
          
          // Generate a color based on the keyword (simplified approach)
          const hue = (keyword.keyword.charCodeAt(0) * 137) % 360;
          const saturation = 70 + (keyword.frequency / maxFrequency) * 30;
          const lightness = 45 + (keyword.frequency / maxFrequency) * 20;
          
          return (
            <div
              key={i}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ 
                fontSize: `${fontSize}px`,
                color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
              }}
              title={`${keyword.keyword}: appeared ${keyword.frequency} times`}
            >
              {keyword.keyword}
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        Keywords extracted from your journal entries
      </div>
    </div>
  );
};

export default KeywordCloud;