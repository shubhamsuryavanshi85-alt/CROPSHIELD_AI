import React from 'react';

export default function Badge({ variant = 'default', children, className = '' }) {
  let baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium';

  const variants = {
    critical: 'bg-danger-red/10 text-danger-red border border-danger-red/30',
    high: 'bg-danger-red/10 text-danger-red border border-danger-red/30',
    warning: 'bg-warning-amber/10 text-warning-dark border border-warning-amber/30',
    moderate: 'bg-warning-amber/10 text-warning-dark border border-warning-amber/30',
    caution: 'bg-harvest-gold/15 text-harvest-dark border border-harvest-gold/30',
    healthy: 'bg-growth/10 text-growth-dark border border-growth/30',
    low: 'bg-growth/10 text-growth-dark border border-growth/30',
    info: 'bg-sky-blue/10 text-sky-dark border border-sky-blue/30',
    soil: 'bg-soil-dark text-parchment',
    default: 'bg-soil-dark/5 text-soil-dark border border-soil-dark/15',
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
