import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-4 flex flex-col gap-4 sm:gap-5 ${className}`}>
      {children}
    </div>
  );
}
