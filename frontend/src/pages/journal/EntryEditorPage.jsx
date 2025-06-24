import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useJournal from '../../hooks/useJournal';
import EntryEditor from '../../components/journal/EntryEditor';
import MoodSelector from '../../components/journal/MoodSelector';
import TagSelector from '../../components/journal/TagSelector';
import MediaUploader from '../../components/journal/MediaUploader';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { toast } from 'react-toastify';

const EntryEditorPage = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(entryId);
  const [isPublic, setIsPublic] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    createEntry,
    updateEntry,
    getEntryById,
    isLoading,
    error
  } = useJournal();

  const [entry, setEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    media: [],
    isPublic: false
  });

  useEffect(() => {
    if (isEditing) {
      const fetchEntry = async () => {
        try {
          const entryData = await getEntryById(entryId);
          if (entryData) {
            setEntry(entryData);
            setIsPublic(entryData.isPublic);
          }
        } catch (err) {
          toast.error("Failed to load journal entry");
          navigate('/journal');
        }
      };

      fetchEntry();
    }
  }, [entryId, getEntryById, navigate, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleContentChange = (content) => {
    setEntry(prev => ({ ...prev, content }));
    setHasChanges(true);
  };

  const handleMoodChange = (mood) => {
    setEntry(prev => ({ ...prev, mood }));
    setHasChanges(true);
  };

  const handleTagsChange = (tags) => {
    setEntry(prev => ({ ...prev, tags }));
    setHasChanges(true);
  };

  const handleMediaUpload = (newMedia) => {
    setEntry(prev => ({
      ...prev,
      media: [...prev.media, ...newMedia]
    }));
    setHasChanges(true);
  };

  const handleMediaRemove = (index) => {
    setEntry(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const handlePublicToggle = () => {
    setIsPublic(!isPublic);
    setEntry(prev => ({ ...prev, isPublic: !isPublic }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!entry.title.trim()) {
      toast.warning("Please add a title to your journal entry");
      return;
    }

    try {
      if (isEditing) {
        await updateEntry(entryId, entry);
        toast.success("Journal entry updated successfully");
      } else {
        await createEntry(entry);
        toast.success("Journal entry created successfully");
      }
      setHasChanges(false);
      navigate('/journal');
    } catch (err) {
      toast.error(isEditing ? "Failed to update entry" : "Failed to create entry");
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      setShowExitModal(true);
    } else {
      navigate('/journal');
    }
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigate('/journal');
  };

  if (isLoading) return <div className="flex justify-center mt-20"><Loader /></div>;

  if (error) {
    return <div className="text-center mt-20 text-red-500">An error occurred. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {isEditing ? 'Edit Journal Entry' : 'New Journal Entry'}
          </h1>
        </div>

        <div className="space-y-6">

          {/* Editor */}
          <EntryEditor
            content={entry.content}
            onChange={handleContentChange}
          />

          {/* Public/Private Toggle */}
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPublic}
                  onChange={handlePublicToggle}
                />
                <div className={`block w-14 h-8 rounded-full ${isPublic ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isPublic ? 'transform translate-x-6' : ''}`}></div>
              </div>
              <div className="ml-3 text-gray-700 dark:text-gray-300">
                {isPublic ? 'Public Entry' : 'Private Entry'}
              </div>
            </label>
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {isPublic ? 'Others can view this entry' : 'Only you can view this entry'}
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Unsaved Changes"
      >
        <div className="p-6">
          <p className="mb-4">You have unsaved changes. Are you sure you want to leave?</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowExitModal(false)}>
              Stay
            </Button>
            <Button variant="danger" onClick={confirmExit}>
              Discard Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EntryEditorPage;