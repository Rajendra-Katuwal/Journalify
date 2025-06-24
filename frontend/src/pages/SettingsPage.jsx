import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

const SettingsPage = () => {
  const { user, updateSettings } = useAuth();
  const [notifications, setNotifications] = useState(user?.settings?.notifications || false);
  const [darkMode, setDarkMode] = useState(user?.settings?.darkMode || false);
  const [language, setLanguage] = useState(user?.settings?.language || 'en');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateSettings({ 
        notifications, 
        darkMode, 
        language 
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">App Settings</h1>
      
      <form onSubmit={handleUpdateSettings} className="max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="notifications" className="text-gray-700 text-sm font-bold">
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="darkMode" className="text-gray-700 text-sm font-bold">
            Dark Mode
          </label>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;