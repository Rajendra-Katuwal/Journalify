import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import MoodChart from '../../components/insights/MoodChart';
import useInsights from '../../hooks/useInsights';
import { toast } from 'react-toastify';

const MoodAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month'); // week, month, year, all-time
  const [chartType, setChartType] = useState('line'); // line, bar, radar
  const { getMoodAnalytics, moodAnalytics, isLoading, error } = useInsights();

  useEffect(() => {
    getMoodAnalytics(timeRange);
  }, [getMoodAnalytics, timeRange]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load mood analytics: ${error}`);
    }
  }, [error]);

  const moodLabels = {
    5: 'Very Happy',
    4: 'Happy',
    3: 'Neutral',
    2: 'Sad',
    1: 'Very Sad'
  };

  const getMoodAverageText = () => {
    if (!moodAnalytics || !moodAnalytics.averageMood) return null;

    const avgMood = moodAnalytics.averageMood;
    const closestMood = Math.round(avgMood);
    const moodText = moodLabels[closestMood];

    return (
      <div className="text-center">
        <span className="text-4xl font-bold">{avgMood.toFixed(1)}</span>
        <span className="block text-gray-600 dark:text-gray-400">{moodText}</span>
      </div>
    );
  };

  return (
    // <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Mood Analytics
          </h1>
          <div className="flex flex-wrap gap-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-1">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded-md text-sm ${timeRange === 'week'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded-md text-sm ${timeRange === 'month'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-3 py-1 rounded-md text-sm ${timeRange === 'year'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Year
              </button>
              <button
                onClick={() => setTimeRange('all-time')}
                className={`px-3 py-1 rounded-md text-sm ${timeRange === 'all-time'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                All Time
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'line'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'bar'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('radar')}
                className={`px-3 py-1 rounded-md text-sm ${chartType === 'radar'
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                Radar
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {timeRange === 'week' ? 'This Week' :
                  timeRange === 'month' ? 'This Month' :
                    timeRange === 'year' ? 'This Year' : 'All Time'} Mood Chart
              </h2>
              <MoodChart
                data={moodAnalytics?.moodData || []}
                timeRange={timeRange}
                chartType={chartType}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Mood Summary</h2>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Average Mood</h3>
                  {getMoodAverageText()}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <h3 className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Highest Mood</h3>
                    <div className="text-lg font-bold">{moodAnalytics?.highestMood || '-'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{moodAnalytics?.highestMoodDate || ''}</div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <h3 className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Lowest Mood</h3>
                    <div className="text-lg font-bold">{moodAnalytics?.lowestMood || '-'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{moodAnalytics?.lowestMoodDate || ''}</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white">Mood Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(moodAnalytics?.moodDistribution || {}).map(([mood, percentage]) => (
                      <div key={mood} className="flex items-center">
                        <span className="w-24 text-sm">{moodLabels[mood]}</span>
                        <div className="flex-1 mx-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI-Generated Mood Insights</h2>
              <div className="prose dark:prose-invert max-w-none">
                {moodAnalytics?.insights ? (
                  <div dangerouslySetInnerHTML={{ __html: moodAnalytics.insights }}></div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    Continue journaling to receive personalized mood insights.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    // </MainLayout>
  );
};

export default MoodAnalyticsPage;