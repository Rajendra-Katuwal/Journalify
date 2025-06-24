import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  useJournal  from '../../hooks/useJournal';
import EntryCard from '../../components/journal/EntryCard';
import QuickActions from '../../components/QuickActions';
import MoodChart from '../../components/insights/MoodChart';
import RecentEntries from '../../components/RecentEntries';
import MotivationalContent from '../../components/MotivationalContent'; 
import  Button  from '../../components/common/Button';
import  Loader  from '../../components/common/Loader';
import { toast } from 'react-toastify';

const JournalHomePage = () => {
  const [view, setView] = useState('grid'); // grid or list
  const navigate = useNavigate();
  // const { entries, isLoading, error, fetchEntries } = useJournal();
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const entries = null;
  const isLoading = null;
  const error = null;

  // useEffect(() => {
  //   fetchEntries();
  // }, [fetchEntries]);

  // useEffect(() => {
  //   if (entries) {
  //     let filtered = [...entries];
      
  //     // Apply search query filter
  //     if (searchQuery) {
  //       filtered = filtered.filter(entry => 
  //         entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //         entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }
      
  //     // Apply tag filter
  //     if (selectedTag) {
  //       filtered = filtered.filter(entry => 
  //         entry.tags && entry.tags.includes(selectedTag)
  //       );
  //     }
      
  //     setFilteredEntries(filtered);
  //   }
  // }, [entries, searchQuery, selectedTag]);

  const handleCreateEntry = () => {
    navigate('/entry/new');
  };

  const handleMicroEntry = () => {
    navigate('/journal/micro');
  };

  const handleViewEntry = (entryId) => {
    navigate(`/journal/entry/${entryId}`);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const allTags = entries ? [...new Set(entries.flatMap(entry => entry.tags || []))] : [];

  if (isLoading) return <div className="flex justify-center mt-20"><Loader /></div>;
  
  if (error) {
    toast.error("Failed to load journal entries");
    return <div className="text-center mt-20 text-red-500">Something went wrong. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Journal</h1>
        <div className="flex space-x-3">
          <Button onClick={handleMicroEntry} variant="secondary">
            Quick Note
          </Button>
          <Button onClick={handleCreateEntry} variant="primary">
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Search and filters */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search entries..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-lg ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                onClick={() => setView('grid')}
              >
                Grid
              </button>
              <button
                className={`px-3 py-1 rounded-lg ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                onClick={() => setView('list')}
              >
                List
              </button>
            </div>
          </div>

          {/* Tags filter */}
          {allTags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                  onClick={() => handleTagSelect(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Entries Grid/List */}
          {filteredEntries.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">No journal entries found. Start writing your thoughts!</p>
              <Button onClick={handleCreateEntry} variant="primary" className="mt-4">
                Create Your First Entry
              </Button>
            </div>
          ) : (
            <div className={`${view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}`}>
              {filteredEntries.map(entry => (
                <EntryCard 
                  key={entry.id} 
                  entry={entry} 
                  onClick={() => handleViewEntry(entry.id)} 
                  viewType={view} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <MoodChart />
          <RecentEntries 
            entries={entries?.slice(0, 3) || []} 
            onViewEntry={handleViewEntry} 
          />
          <MotivationalContent />
        </div>
      </div>
    </div>
  );
};

export default JournalHomePage;