import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  useJournal  from '../../hooks/useJournal';
import Loader  from '../../components/common/Loader';
import Button  from '../../components/common/Button';
import { toast } from 'react-toastify';

const CalendarViewPage = () => {
  const navigate = useNavigate();
  const { entries, isLoading, error, fetchEntries } = useJournal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [entriesByDate, setEntriesByDate] = useState({});

  // useEffect(() => {
  //   fetchEntries();
  // }, [fetchEntries]);

  useEffect(() => {
    if (entries && entries.length > 0) {
      // Create a map of entries by date
      const entryMap = {};
      entries.forEach(entry => {
        const dateKey = new Date(entry.createdAt).toISOString().split('T')[0];
        if (!entryMap[dateKey]) {
          entryMap[dateKey] = [];
        }
        entryMap[dateKey].push(entry);
      });
      setEntriesByDate(entryMap);
    }
  }, [entries]);

  useEffect(() => {
    generateCalendarDays(currentDate);
  }, [currentDate, entriesByDate]);

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Array to hold all calendar days
    const days = [];
    
    // Add previous month days to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayObj = {
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
        entries: []
      };
      const dateKey = dayObj.date.toISOString().split('T')[0];
      dayObj.entries = entriesByDate[dateKey] || [];
      days.push(dayObj);
    }
    
    // Add current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayObj = {
        date: new Date(year, month, i),
        isCurrentMonth: true,
        entries: []
      };
      const dateKey = dayObj.date.toISOString().split('T')[0];
      dayObj.entries = entriesByDate[dateKey] || [];
      days.push(dayObj);
    }
    
    // Add next month days to complete the grid (6 rows x 7 columns = 42 cells)
    const daysNeeded = 42 - days.length;
    for (let i = 1; i <= daysNeeded; i++) {
      const dayObj = {
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        entries: []
      };
      const dateKey = dayObj.date.toISOString().split('T')[0];
      dayObj.entries = entriesByDate[dateKey] || [];
      days.push(dayObj);
    }
    
    setCalendarDays(days);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (day) => {
    if (day.entries.length > 0) {
      // If there's only one entry, go directly to it
      if (day.entries.length === 1) {
        navigate(`/journal/entry/${day.entries[0].id}`);
      } else {
        // If there are multiple entries, navigate to journal home with date filter
        const dateStr = day.date.toISOString().split('T')[0];
        navigate(`/journal?date=${dateStr}`);
      }
    } else {
      // If no entries, create a new one for this date
      navigate('/journal/new', { 
        state: { selectedDate: day.date.toISOString() } 
      });
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-500';
      case 'sad': return 'bg-blue-500';
      case 'angry': return 'bg-red-500';
      case 'excited': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) return <div className="flex justify-center mt-20"><Loader /></div>;
  
  if (error) {
    toast.error("Failed to load journal entries");
    return <div className="text-center mt-20 text-red-500">Something went wrong. Please try again later.</div>;
  }

  // Format month name and year
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Days of week
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Calendar View</h1>
          {/* <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => navigate('/journal')}>
              Grid View
            </Button>
            <Button variant="primary" onClick={() => navigate('/journal/new')}>
              New Entry
            </Button>
          </div> */}
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {monthName} {year}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-gray-100 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700">
            {weekdays.map((day, index) => (
              <div 
                key={index} 
                className="py-2 text-sm font-medium text-center text-gray-600 dark:text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              // Check if day is today
              const isToday = day.date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={index}
                  onClick={() => handleDayClick(day)}
                  className={`
                    min-h-24 border-b border-r border-gray-200 dark:border-gray-700 p-2
                    ${day.isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-850 text-gray-400 dark:text-gray-600'}
                    ${isToday ? 'ring-2 ring-blue-500 z-10' : ''}
                    hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer
                    ${index % 7 === 6 ? 'border-r-0' : ''}
                    ${index >= calendarDays.length - 7 ? 'border-b-0' : ''}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <span className={`
                      text-sm font-medium 
                      ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
                      ${!day.isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                    `}>
                      {day.date.getDate()}
                    </span>
                    {day.entries.length > 0 && (
                      <span className="text-xs font-medium text-blue-500 dark:text-blue-400">
                        {day.entries.length > 1 ? `${day.entries.length} entries` : '1 entry'}
                      </span>
                    )}
                  </div>
                  
                  {/* Entry indicators */}
                  {day.entries.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {day.entries.slice(0, 3).map((entry, entryIndex) => (
                        <div 
                          key={entryIndex}
                          className="flex items-center"
                        >
                          <span 
                            className={`w-2 h-2 rounded-full mr-1 ${getMoodColor(entry.mood)}`}
                          ></span>
                          <span className="text-xs truncate text-gray-700 dark:text-gray-300">
                            {entry.title.length > 15 ? `${entry.title.substring(0, 15)}...` : entry.title}
                          </span>
                        </div>
                      ))}
                      {day.entries.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          +{day.entries.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Happy</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Sad</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Angry</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Excited</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarViewPage;