import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiCalendar, FiBarChart2, FiTag } from 'react-icons/fi';

const QuickActions = () => {
  const actions = [
    {
      name: 'New Entry',
      description: 'Create a new journal entry',
      icon: <FiEdit className="h-6 w-6 text-white" />,
      bgColor: 'bg-indigo-600',
      link: '/entry/new',
    },
    {
      name: 'Quick Note',
      description: 'Add a micro journal entry',
      icon: <FiEdit className="h-6 w-6 text-white" />,
      bgColor: 'bg-purple-600',
      link: '/journal/micro',
    },
    {
      name: 'Calendar',
      description: 'View entries by date',
      icon: <FiCalendar className="h-6 w-6 text-white" />,
      bgColor: 'bg-green-600',
      link: '/calendar',
    },
    {
      name: 'Insights',
      description: 'View your journal stats',
      icon: <FiBarChart2 className="h-6 w-6 text-white" />,
      bgColor: 'bg-blue-600',
      link: '/insights',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.link}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
          >
            <div className={`p-3 rounded-full ${action.bgColor} mb-3`}>
              {action.icon}
            </div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;