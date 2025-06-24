import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  id,
  error,
  className = '',
  containerClassName = '',
  labelClassName = '',
  helpText,
  ...props
}, ref) => {
  const baseInputStyles = 'block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm';
  
  const errorInputStyles = 'border-red-300 dark:border-red-600 text-red-900 dark:text-red-300 placeholder-red-300 dark:placeholder-red-500 focus:border-red-500 focus:ring-red-500';
  
  const inputClasses = `
    ${baseInputStyles} 
    ${error ? errorInputStyles : ''} 
    ${className}
  `;

  return (
    <div className={`mb-1 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`px-4 py-2 ${inputClasses}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        {...props}
      />
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" id={`${id}-help`}>
          {helpText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;