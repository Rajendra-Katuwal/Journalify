import React, { useState, useEffect } from 'react';
import PublicEntry from './PublicEntry';
import Loader from '../common/Loader';
import Button from '../common/Button';
import Input from '../common/Input';

const SocialFeed = ({ entries = [], isLoading, error, onLikeEntry, onLoadMore, hasMore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [selectedTag, setSelectedTag] = useState(null);
  
  // Extract all unique tags from entries
  const allTags = [...new Set(entries.flatMap(entry => entry.tags || []))];
  
  useEffect(() => {
    let filtered = [...entries];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        entry.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.author?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter(entry => 
        entry.tags && entry.tags.includes(selectedTag)
      );
    }
    
    setFilteredEntries(filtered);
  }, [entries, searchTerm, selectedTag]);
  
  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };
  
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </button>
            ))}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
      
      {isLoading && !filteredEntries.length ? (
        <div className="flex justify-center my-12">
          <Loader size="lg" />
        </div>
      ) : filteredEntries.length > 0 ? (
        <>
          <div className="space-y-6">
            {filteredEntries.map(entry => (
              <PublicEntry 
                key={entry.id} 
                entry={entry} 
                onLike={onLikeEntry} 
              />
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-8 text-center">
              <Button 
                onClick={onLoadMore} 
                variant="outline" 
                isLoading={isLoading}
                disabled={isLoading}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">No entries found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchTerm || selectedTag ? 'Try different search terms or filters' : 'There are no public entries yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;