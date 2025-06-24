import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import TagSelector from './TagSelector';
import MediaUploader from './MediaUploader';
import MoodSelector from './MoodSelector';
import  useJournal  from '../../hooks/useJournal';
import { toast } from 'react-toastify';

const EntryEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEntry, saveEntry, updateEntry } = useJournal();
  const [isLoading, setIsLoading] = useState(false);
  const [entry, setEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    media: []
  });
  
  const isEditMode = Boolean(id);

  useEffect(() => {
    const loadEntry = async () => {
      if (isEditMode) {
        setIsLoading(true);
        try {
          const loadedEntry = await getEntry(id);
          if (loadedEntry) {
            setEntry(loadedEntry);
          }
        } catch (error) {
          toast.error('Failed to load journal entry');
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadEntry();
  }, [id, getEntry, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (newTags) => {
    setEntry(prev => ({ ...prev, tags: newTags }));
  };

  const handleMoodChange = (newMood) => {
    setEntry(prev => ({ ...prev, mood: newMood }));
  };

  const handleMediaUpload = (files) => {
    setEntry(prev => ({ 
      ...prev, 
      media: [...prev.media, ...files] 
    }));
  };

  const handleRemoveMedia = (index) => {
    setEntry(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isEditMode) {
        await updateEntry(id, entry);
        toast.success('Journal entry updated successfully');
      } else {
        const newEntry = await saveEntry(entry);
        toast.success('Journal entry saved successfully');
        navigate(`/journal/entry/${newEntry.id}`);
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'save'} journal entry`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            name="title"
            placeholder="Title (optional)"
            value={entry.title}
            onChange={handleChange}
            className="text-xl font-medium"
          />
        </div>
        
        <div className="mb-6">
          <textarea
            name="content"
            placeholder="What's on your mind today?"
            value={entry.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 border rounded-lg 
                      dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="w-full lg:w-1/2">
            <MoodSelector 
              selectedMood={entry.mood} 
              onMoodChange={handleMoodChange} 
            />
          </div>
          <div className="w-full lg:w-1/2">
            <TagSelector 
              selectedTags={entry.tags} 
              onTagsChange={handleTagsChange} 
            />
          </div>
        </div>
        
        <div className="mb-6">
          <MediaUploader 
            media={entry.media}
            onUpload={handleMediaUpload}
            onRemove={handleRemoveMedia}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : isEditMode ? 'Update Entry' : 'Save Entry'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EntryEditor;