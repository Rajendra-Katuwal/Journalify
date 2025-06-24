import React from "react";

const CheckBox = ({ label, className, checked, onChange }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
                   checked:bg-indigo-600 checked:border-indigo-600 
                   hover:border-gray-400 dark:hover:border-gray-500 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
      />
      <label htmlFor={label} className="cursor-pointer text-sm text-gray-800 dark:text-gray-100">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
