import React, { useState, useEffect } from 'react';

const MotivationalContent = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const motivationalQuotes = [
    {
      text: "Write it down. Written goals have a way of transforming wishes into wants, cant's into cans, dreams into plans, and plans into reality.",
      author: "Michael Hyatt"
    },
    {
      text: "Journaling is like whispering to one's self and listening at the same time.",
      author: "Mina Murray"
    },
    {
      text: "Journal writing is a voyage to the interior.",
      author: "Christina Baldwin"
    },
    {
      text: "Write hard and clear about what hurts.",
      author: "Ernest Hemingway"
    },
    {
      text: "The habit of writing for my eye is good practice. It loosens the ligaments.",
      author: "Virginia Woolf"
    },
    {
      text: "Fill your paper with the breathings of your heart.",
      author: "William Wordsworth"
    },
    {
      text: "What would happen if one woman told the truth about her life? The world would split open.",
      author: "Muriel Rukeyser"
    },
    {
      text: "Pour your heart into it, because the words you write today might be the only thing that make sense to someone tomorrow.",
      author: "Rachel Wolchin"
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Get random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Daily Inspiration</h3>
      {quote && (
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-300 italic">"{quote.text}"</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-right">— {quote.author}</p>
        </div>
      )}
    </div>
  );
};

export default MotivationalContent;