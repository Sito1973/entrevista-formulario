
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  const baseClasses = "mt-2 block w-full px-4 py-3 bg-white border border-[#e6ccb2] rounded-xl text-sm shadow-sm placeholder-[#b08968] focus:outline-none transition-all duration-200 disabled:bg-[#f8f3ee] disabled:text-[#b08968] disabled:border-[#e6ccb2] disabled:shadow-none";
  const errorClasses = "border-[#9c6644] text-[#7f5539] focus:border-[#7f5539] focus:ring-2 focus:ring-[#ddb892] bg-[#f8f3ee]";
  const normalClasses = "border-[#e6ccb2] focus:border-[#b08968] focus:ring-2 focus:ring-[#f1e6dc] hover:border-[#ddb892]";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#7f5539] mb-1">
        {label}
        {props.required && <span className="text-[#b08968] ml-1">*</span>}
      </label>
      <input
        id={id}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-[#7f5539] flex items-center space-x-1">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </p>}
    </div>
  );
};
