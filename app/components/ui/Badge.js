import React from 'react';

export default function Badge({ children, variant = 'info', className = '' }) {
  const baseStyles = 'inline-flex items-center font-mono text-xs font-bold px-2.5 py-1 rounded-lg tracking-wide uppercase';
  
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    info: 'bg-brand-light text-brand-blue border border-brand-blue/10'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}