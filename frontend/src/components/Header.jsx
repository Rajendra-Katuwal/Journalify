import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from './common/Button';
import lightLogo from "../assets/images/LightLogo.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by AuthContext
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and hamburger menu */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white lg:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/" className="ml-2 lg:ml-0 flex items-center">
              <img 
                src={lightLogo} 
                alt="Journalify" 
                className="h-32 aspect-auto mr-2" 
              />
              {/* <span className="text-xl font-bold text-gray-900 dark:text-white hidden md:block">Journalify</span> */}
            </Link>
          </div>
          
          {/* Center: Navigation (only visible on larger screens) */}
          <nav className="hidden lg:flex space-x-8">
            <Link 
              to="/journal"
              className={`text-sm font-medium ${
                location.pathname.startsWith('/journal')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Journal
            </Link>
            <Link 
              to="/insights"
              className={`text-sm font-medium ${
                location.pathname.startsWith('/insights')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Insights
            </Link>
            <Link 
              to="/social"
              className={`text-sm font-medium ${
                location.pathname.startsWith('/social')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Public Feed
            </Link>
          </nav>
          
          {/* Right side: User menu or login/signup buttons */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                    {user.username || 'User'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {profileMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    <div className="py-1" role="none">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        type="button"
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        role="menuitem"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  to="/login" 
                  variant="text"
                  className="text-sm"
                >
                  Log in
                </Button>
                <Button 
                  to="/register" 
                  variant="primary"
                  className="text-sm"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;