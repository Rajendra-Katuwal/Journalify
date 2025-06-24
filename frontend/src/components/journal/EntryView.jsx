import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Button from '../common/Button';
import  useJournal  from '../../hooks/useJournal';
import { toast } from 'react-toastify';
import Modal from '../common/Modal';

const EntryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEntry, deleteEntry } = useJournal();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mood emoji mappings
  const moodEmojis = {
    happy: '😊',
    sad: '😔',
    neutral: '😐',
    excited: '🎉',
    angry: '😠',
    anxious: '😰',
    relaxed: '😌'
  };

  useEffect(() => {
    const loadEntry = async () => {
      setIsLoading(true);
      try {
        const loadedEntry = await getEntry(id);
        if (loadedEntry) {
          setEntry(loadedEntry);
        } else {
          toast.error('Entry not found');
          navigate('/journal');
        }
      } catch (error) {
        toast.error('Failed to load journal entry');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEntry();
  }, [id, getEntry, navigate]);

  const handleEdit = () => {
    navigate(`/journal/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteEntry(id);
      toast.success('Journal entry deleted successfully');
      navigate('/journal');
    } catch (error) {
      toast.error('Failed to delete journal entry');
      console.error(error);
    }
    setShowDeleteModal(false);
  };

  const handleShare = () => {
    // Implement sharing functionality
    toast.info('Sharing functionality will be available soon!');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!entry) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {entry.title || format(new Date(entry.createdAt), 'PPP')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(entry.createdAt), 'EEEE, MMMM d, yyyy • h:mm a')}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={handleEdit}>
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2" title={`Mood: ${entry.mood}`}>
          {moodEmojis[entry.mood] || '📝'}
        </span>
        <span className="text-gray-700 dark:text-gray-300 capitalize">
          Feeling {entry.mood}
        </span>
      </div>
      
      <div className="prose dark:prose-invert max-w-none mb-6">
        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
          {entry.content}
        </p>
      </div>
      
      {entry.media && entry.media.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
            Attachments
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {entry.media.map((media, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                {media.type.startsWith('image') ? (
                  <img 
                    src={media.url} 
                    alt={`Media ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                ) : media.type.startsWith('audio') ? (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3">
                    <audio controls className="w-full">
                      <source src={media.url} type={media.type} />
                    </audio>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center justify-center h-48">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      {media.name || `File ${index + 1}`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {entry.tags && entry.tags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t dark:border-gray-700">
        <Button 
          variant="outline" 
          className="w-full md:w-auto"
          onClick={handleShare}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Entry
        </Button>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Entry"
      >
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EntryView;