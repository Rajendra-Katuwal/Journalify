import React from 'react';

const MoodSelector = ({ selectedMood = 'neutral', onMoodChange, compact = false }) => {
  const moods = [
    { id: 'excited', emoji: '🎉', label: 'Excited' },
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'relaxed', emoji: '😌', label: 'Relaxed' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'sad', emoji: '😔', label: 'Sad' },
    { id: 'angry', emoji: '😠', label: 'Angry' },
    { id: 'anxious', emoji: '😰', label: 'Anxious' }
  ];

  return (
    <div className="w-full">
      {!compact && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          How are you feeling?
        </label>
      )}
      
      <div className={`grid ${compact ? 'grid-cols-4' : 'grid-cols-7'} gap-2`}>
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            onClick={() => onMoodChange(mood.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors
                      ${selectedMood === mood.id 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-2 border-blue-500 dark:border-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            {!compact && (
              <span className="text-xs mt-1">{mood.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;