import React, { createContext, useState, useEffect } from 'react';
import {
  getEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntryTags,
} from '../services/journalService';
import {useAuth} from '../hooks/useAuth';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [entries, setEntries] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch entries when user authenticates
  useEffect(() => {
    const loadJournalData = async () => {
      if (!isAuthenticated) {
        setEntries([]);
        setTags([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch entries and tags in parallel
        const [entriesData, tagsData] = await Promise.all([
          getEntries(),
          getEntryTags()
        ]);

        setEntries(entriesData);
        setTags(tagsData);
      } catch (err) {
        console.error('Failed to load journal data:', err);
        setError(err.message || 'Failed to load journal data');
      } finally {
        setLoading(false);
      }
    };

    loadJournalData();
  }, [isAuthenticated, user]);

  const addEntry = async (entryData) => {
    setLoading(true);
    setError(null);
    try {
      const newEntry = await createEntry(entryData);
      setEntries(prevEntries => [newEntry, ...prevEntries]);
      return newEntry;
    } catch (err) {
      setError(err.message || 'Failed to create entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editEntry = async (id, entryData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEntry = await updateEntry(id, entryData);
      setEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === id ? updatedEntry : entry
        )
      );
      return updatedEntry;
    } catch (err) {
      setError(err.message || 'Failed to update entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeEntry = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteEntry(id);
      setEntries(prevEntries =>
        prevEntries.filter(entry => entry.id !== id)
      );
    } catch (err) {
      setError(err.message || 'Failed to delete entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags(prevTags => [...prevTags, tag]);
    }
  };

  const filterEntriesByTag = (tagName) => {
    return entries.filter(entry =>
      entry.tags && entry.tags.includes(tagName)
    );
  };

  const filterEntriesByDate = (startDate, endDate) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  const searchEntries = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return entries.filter(entry =>
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      entry.title.toLowerCase().includes(lowercaseQuery) ||
      (entry.tags && entry.tags.some(tag =>
        tag.toLowerCase().includes(lowercaseQuery)
      ))
    );
  };

  const value = {
    entries,
    tags,
    loading,
    error,
    addEntry,
    editEntry,
    removeEntry,
    addTag,
    filterEntriesByTag,
    filterEntriesByDate,
    searchEntries
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
};