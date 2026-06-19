import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  type = 'button', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-semibold text-sm transition-all duration-200 rounded-xl focus:outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm shadow-brand-blue/20 px-5 py-2.5',
    secondary: 'bg-brand-light text-brand-blue hover:bg-brand-blue/10 px-5 py-2.5',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 px-5 py-2.5',
    icon: 'p-2 text-gray-500 hover:bg-gray-100 rounded-xl'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}