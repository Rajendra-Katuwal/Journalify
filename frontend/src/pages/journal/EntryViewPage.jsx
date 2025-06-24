import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import  useJournal  from '../../hooks/useJournal';
import  useInsights  from '../../hooks/useInsights';
import EntryView from '../../components/journal/EntryView';
import EntrySummary from '../../components/insights/EntrySummary';
import  Button  from '../../components/common/Button';
import  Modal  from '../../components/common/Modal';
import  Loader  from '../../components/common/Loader';
import { toast } from 'react-toastify';

const EntryViewPage = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { getEntryById, deleteEntry, isLoading, error } = useJournal();
  const { generateInsights, isGeneratingInsights } = useInsights();
  
  const [entry, setEntry] = useState(null);
  const [insights, setInsights] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entryData = await getEntryById(entryId);
        if (entryData) {
          setEntry(entryData);
        } else {
          navigate('/journal');
        }
      } catch (err) {
        toast.error("Failed to load journal entry");
        navigate('/journal');
      }
    };
    
    fetchEntry();
  }, [entryId, getEntryById, navigate]);

  const handleEdit = () => {
    navigate(`/journal/edit/${entryId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteEntry(entryId);
      toast.success("Journal entry deleted successfully");
      navigate('/journal');
    } catch (err) {
      toast.error("Failed to delete entry");
      setShowDeleteModal(false);
    }
  };

  const handleInsights = async () => {
    if (!insights) {
      try {
        const entryInsights = await generateInsights(entry);
        setInsights(entryInsights);
      } catch (err) {
        toast.error("Failed to generate insights");
        return;
      }
    }
    setShowInsights(true);
  };

  const handleShare = () => {
    if (!entry.isPublic) {
      // If entry is private, show modal to make it public first
      toast.info("To share this entry, you need to make it public first.");
      return;
    }
    
    // Generate shareable link
    const shareableLink = `${window.location.origin}/shared/${entryId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const handleBack = () => {
    navigate('/journal');
  };

  if (isLoading) return <div className="flex justify-center mt-20"><Loader /></div>;
  
  if (error) {
    return <div className="text-center mt-20 text-red-500">An error occurred while loading the entry.</div>;
  }

  if (!entry) return null;

  const entryDate = new Date(entry.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Journal Entry</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{entry.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{entryDate}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              onClick={handleInsights}
              disabled={isGeneratingInsights}
            >
              {isGeneratingInsights ? 'Generating...' : 'Get Insights'}
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleShare}
            >
              Share
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="mr-6 flex items-center">
            <span className="mr-2 text-gray-700 dark:text-gray-300">Mood:</span>
            <div className="flex items-center">
              {entry.mood === 'happy' && (
                <span className="flex items-center text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-1">Happy</span>
                </span>
              )}
              {entry.mood === 'sad' && (
                <span className="flex items-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-1">Sad</span>
                </span>
              )}
              {entry.mood === 'neutral' && (
                <span className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-1">Neutral</span>
                </span>
              )}
              {entry.mood === 'angry' && (
                <span className="flex items-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="ml-1">Angry</span>
                </span>
              )}
              {entry.mood === 'excited' && (
                <span className="flex items-center text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  <span className="ml-1">Excited</span>
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {entry.tags && entry.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <EntryView 
          entry={entry} 
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Entry"
      >
        <div className="p-6">
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

      {/* Insights Modal */}
      <Modal
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        title="Journal Insights"
      >
        <div className="p-6">
          {insights ? (
            <EntrySummary insights={insights} />
          ) : (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button 
              variant="primary" 
              onClick={() => setShowInsights(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EntryViewPage;