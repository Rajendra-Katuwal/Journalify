import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import  useInsights  from '../../hooks/useInsights';

const MoodChart = ({ period = 'week' }) => {
  const { getMoodData } = useInsights();
  const [moodData, setMoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMoodData = async () => {
      setIsLoading(true);
      try {
        const data = await getMoodData(period);
        setMoodData(data);
      } catch (error) {
        console.error('Error fetching mood data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoodData();
  }, [getMoodData, period]);

  // Map moods to colors
  const moodColors = {
    happy: '#60A5FA', // blue-400
    sad: '#9CA3AF', // gray-400
    neutral: '#D1D5DB', // gray-300
    excited: '#34D399', // green-400
    angry: '#F87171', // red-400
    anxious: '#FBBF24', // yellow-400
    relaxed: '#A78BFA' // purple-400
  };

  // Map moods to emojis
  const moodEmojis = {
    happy: '😊',
    sad: '😔',
    neutral: '😐',
    excited: '🎉',
    angry: '😠',
    anxious: '😰',
    relaxed: '😌'
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!moodData || moodData.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          Not enough data to display mood trends. Keep journaling to see your mood patterns!
        </p>
      </div>
    );
  }

  const chartHeight = 200;
  const barWidth = `${100 / moodData.length}%`;

  // Find the most common mood
  const moodCounts = moodData.reduce((acc, day) => {
    acc[day.mood] = (acc[day.mood] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
    moodCounts[a] > moodCounts[b] ? a : b, Object.keys(moodCounts)[0]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
        Mood Trends
      </h3>
      
      <div className="flex flex-col h-64">
        <div className="relative flex items-end h-full">
          {moodData.map((day, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-end h-full"
              style={{ width: barWidth }}
            >
              <div 
                className="w-4/5 rounded-t-lg transition-all hover:opacity-90"
                style={{ 
                  height: `${day.intensity * 80}%`, 
                  backgroundColor: moodColors[day.mood] || '#CBD5E1',
                  minHeight: '10%' 
                }}
                title={`${format(new Date(day.date), 'MMM d')}: ${day.mood} (${Math.round(day.intensity * 100)}%)`}
              />
              <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                {format(new Date(day.date), 'd')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Your most common mood: <span className="font-medium capitalize">{mostCommonMood}</span> {moodEmojis[mostCommonMood]}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.keys(moodEmojis).map(mood => (
          <div key={mood} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: moodColors[mood] }}
            ></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {mood}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodChart;