import React from 'react';

export default function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-2xl border border-brand-blue/10 shadow-sm p-5 hover:shadow-md transition-shadow duration-200 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}