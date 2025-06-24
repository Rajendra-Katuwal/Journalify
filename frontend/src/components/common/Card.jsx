import React from 'react';

const Card = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-lg overflow-hidden shadow transition-shadow';
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800',
    primary: 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20',
    success: 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20',
    warning: 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20',
    danger: 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20',
    info: 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20',
    flat: 'bg-gray-50 dark:bg-gray-800 shadow-none border border-gray-200 dark:border-gray-700',
  };
  
  const classes = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${onClick ? 'cursor-pointer hover:shadow-md' : ''}
    ${className}
  `;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-xl font-bold text-gray-800 dark:text-white ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;