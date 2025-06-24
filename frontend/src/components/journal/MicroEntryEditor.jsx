import React, { useState } from 'react';
import Button from '../common/Button';
import MoodSelector from './MoodSelector';
import { useJournal } from '../../hooks/useJournal';
import { toast } from 'react-toastify';

const MAX_CHARS = 280;

const MicroEntryEditor = ({ onComplete }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);
  const { saveEntry } = useJournal();
  
  const charsLeft = MAX_CHARS - content.length;
  
  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please write something before submitting');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const entry = {
        content,
        mood,
        tags: [], // Auto-tag could be implemented here
        media: [],
        isMicroEntry: true
      };
      
      await saveEntry(entry);
      toast.success('Micro entry saved successfully');
      setContent('');
      setMood('neutral');
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      toast.error('Failed to save micro entry');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
          Quick Thought
        </h3>
        
        <div className="mb-4">
          <textarea
            placeholder="What's on your mind? (280 characters max)"
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 border rounded-lg 
                      dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
            rows={3}
            required
          />
          <div className={`text-right text-sm mt-1 ${
            charsLeft < 20 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {charsLeft} characters left
          </div>
        </div>
        
        <div className="mb-4">
          <MoodSelector 
            selectedMood={mood} 
            onMoodChange={handleMoodChange}
            compact
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || content.trim().length === 0}
          >
            {isLoading ? 'Saving...' : 'Save Quick Thought'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MicroEntryEditor;