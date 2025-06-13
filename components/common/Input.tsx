
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  const baseClasses = "mt-2 block w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm shadow-sm placeholder-stone-400 focus:outline-none transition-all duration-200 disabled:bg-stone-50 disabled:text-stone-500 disabled:border-stone-200 disabled:shadow-none";
  const errorClasses = "border-red-400 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50";
  const normalClasses = "border-stone-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 hover:border-stone-400";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-stone-700 mb-1">
        {label}
        {props.required && <span className="text-orange-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </p>}
    </div>
  );
};
