
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  const baseClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const errorClasses = "border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500";
  const normalClasses = "border-slate-300 focus:border-sky-500 focus:ring-sky-500";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
