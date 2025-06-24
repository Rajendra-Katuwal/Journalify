import { useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

const useJournal = () => {
  const context = useContext(JournalContext);
  
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  
  return context;
};

export default useJournal;