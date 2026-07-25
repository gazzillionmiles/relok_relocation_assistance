import React from 'react';

export interface BrokerLayoutProps {
  children: React.ReactNode;
}

export function BrokerLayout({ children }: BrokerLayoutProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
      {children}
    </div>
  );
}
