import React from 'react';

export interface ProfileSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ProfileSection({ children, className = '' }: ProfileSectionProps) {
  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {children}
    </div>
  );
}
