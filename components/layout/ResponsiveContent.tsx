import React from 'react';

export interface ResponsiveContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContent({ children, className = '' }: ResponsiveContentProps) {
  return (
    <div className={`w-full overflow-x-hidden flex-1 ${className}`}>
      {children}
    </div>
  );
}
