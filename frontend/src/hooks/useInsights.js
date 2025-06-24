import { useState, useEffect } from 'react';
import useJournal from './useJournal';
import { analyzeSentiment, getMoodAnalytics, getKeywordAnalytics } from '../services/insightsService';

const useInsights = () => {
  const { entries } = useJournal();
  const [insights, setInsights] = useState({
    sentimentAnalysis: null,
    moodTrends: null,
    keywords: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const generateInsights = async () => {
      if (!entries || entries.length === 0) {
        setInsights(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const sentimentResults = await analyzeSentiment(entries);
        const moodTrendsResults = await getMoodAnalytics(entries);
        const keywordsResults = await getKeywordAnalytics(entries);

        setInsights({
          sentimentAnalysis: sentimentResults,
          moodTrends: moodTrendsResults,
          keywords: keywordsResults,
          loading: false,
          error: null
        });
      } catch (error) {
        setInsights(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to generate insights'
        }));
      }
    };

    generateInsights();
  }, [entries]);

  return insights;
};

export default useInsights;