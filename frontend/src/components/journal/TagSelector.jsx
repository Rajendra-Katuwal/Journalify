import React, { useState, useEffect, useRef } from 'react';

const TagSelector = ({ selectedTags = [], onTagsChange, maxTags = 10 }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Predefined common tags
  const commonTags = [
    'work', 'personal', 'family', 'health', 'fitness',
    'travel', 'food', 'learning', 'productivity', 'goals',
    'reflection', 'gratitude', 'ideas', 'projects'
  ];

  useEffect(() => {
    // Filter suggestions based on input
    if (inputValue.trim()) {
      const filtered = commonTags.filter(tag => 
        tag.toLowerCase().includes(inputValue.toLowerCase()) && 
        !selectedTags.includes(tag)
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [inputValue, selectedTags]);

  const addTag = (tag) => {
    const trimmedTag = tag.trim().toLowerCase();
    
    if (!trimmedTag) return;
    
    // Check if tag already exists
    if (selectedTags.includes(trimmedTag)) {
      return;
    }
    
    // Check if max tags reached
    if (selectedTags.length >= maxTags) {
      return;
    }
    
    onTagsChange([...selectedTags, trimmedTag]);
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      removeTag(selectedTags[selectedTags.length - 1]);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      addTag(suggestions[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Tags
      </label>
      
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 min-h-[42px]">
        {selectedTags.map((tag, index) => (
          <div 
            key={index} 
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-full text-sm flex items-center"
          >
            #{tag}
            <button 
              type="button" 
              onClick={() => removeTag(tag)}
              className="ml-1 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        
        {selectedTags.length < maxTags && (
          <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={selectedTags.length === 0 ? "Add tags..." : ""}
            className="flex-grow outline-none bg-transparent min-w-[120px] h-7"
          />
        )}
      </div>
      
      {suggestions.length > 0 && (
        <div className="mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border dark:border-gray-700 overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => addTag(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Press Enter to add a tag. {maxTags - selectedTags.length} tags remaining.
      </p>
    </div>
  );
};

export default TagSelector;