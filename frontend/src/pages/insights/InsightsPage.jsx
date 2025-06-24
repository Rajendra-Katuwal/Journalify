import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import MoodChart from '../../components/insights/MoodChart';
import KeywordCloud from '../../components/insights/KeywordCloud';
import EntrySummary from '../../components/insights/EntrySummary';
import TrendAnalysis from '../../components/insights/TrendAnalysis';
import useJournal from '../../hooks/useJournal';
import useInsights from '../../hooks/useInsights';
import { toast } from 'react-toastify';

const InsightsPage = () => {
  const navigate = useNavigate();
  const { entries } = useJournal();
  const {
    generateInsights,
    insights,
    isLoading,
    error
  } = useInsights();
  const [timeRange, setTimeRange] = useState('month'); // week, month, year

  useEffect(() => {
    if (entries && entries.length > 0) {
      generateInsights(timeRange);
    }
  }, [generateInsights, entries, timeRange]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load insights: ${error}`);
    }
  }, [error]);

  if (entries && entries.length === 0) {
    return (
      // <MainLayout>
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No entries yet to generate insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Write your first journal entry to start tracking your mood and generating insights.
          </p>
          <button
            onClick={() => navigate('/entry/new')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create your first entry
          </button>
        </div>
      //</MainLayout>
    );
  }

  return (
    // <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Your Journal Insights
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-md ${timeRange === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-md ${timeRange === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-md ${timeRange === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
            >
              Year
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Mood Trends</h2>
              <MoodChart data={insights?.moodData || []} timeRange={timeRange} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Common Themes</h2>
              <KeywordCloud data={insights?.keywordData || []} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Entry Analysis</h2>
              <EntrySummary data={insights?.recentEntrySummary || {}} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Trend Analysis</h2>
              <TrendAnalysis data={insights?.trendAnalysis || {}} />
            </div>
          </div>
        )}
      </div>
    // </MainLayout>
  );
};

export default InsightsPage;