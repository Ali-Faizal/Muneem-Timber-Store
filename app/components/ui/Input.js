import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-xs font-heading font-semibold text-gray-500 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-full bg-gray-50/50 border border-gray-200 text-brand-dark text-sm rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400"
        {...props}
      />
    </div>
  );
}