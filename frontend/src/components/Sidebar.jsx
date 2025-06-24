import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiPieChart, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    // { name: 'Home', icon: <FiHome className="w-5 h-5" />, path: '/journal' },
    { name: 'Journal', icon: <FiBook className="w-5 h-5" />, path: '/journal' },
    { name: 'Insights', icon: <FiPieChart className="w-5 h-5" />, path: '/insights' },
    { name: 'Public Feed', icon: <FiUsers className="w-5 h-5" />, path: '/social' },
    { name: 'Settings', icon: <FiSettings className="w-5 h-5" />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <button
        type="button"
        className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white lg:hidden z-100 fixed top-0 left-0"
        onClick={toggleSidebar}
      >
        <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 '
          } ${isOpen ? '' : 'hidden'
          }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:static lg:h-auto lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {/* <img
                src={lightLogo}
                alt="Journalify"
                className="h-32 w-32"
              /> */}
              <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-200">Journalify</span>
            </div>
          </div>

          {user && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.displayName || user.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname.includes(item.path)
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-3">Log out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;