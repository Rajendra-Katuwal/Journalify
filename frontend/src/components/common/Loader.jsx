import React from 'react';

const Loader = ({ 
  size = 'md', 
  color = 'primary', 
  className = '', 
  fullScreen = false 
}) => {
  const sizeClasses = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };
  
  const colorClasses = {
    primary: 'border-indigo-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    info: 'border-blue-500',
  };
  
  const spinnerClasses = `
    animate-spin rounded-full border-t-transparent
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${className}
  `;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="text-center">
          <div className="inline-block">
            <div className={spinnerClasses}></div>
          </div>
          <p className="mt-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <div className={spinnerClasses}></div>;
};

export default Loader;