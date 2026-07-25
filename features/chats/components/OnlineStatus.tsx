import React from 'react';

export interface OnlineStatusProps {
  isOnline?: boolean;
  className?: string;
}

export function OnlineStatus({ isOnline = true, className = '' }: OnlineStatusProps) {
  return (
    <span className={`flex items-center gap-1 text-[11px] font-semibold text-[#128A4E] ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#128A4E] animate-pulse" />
      <span>{isOnline ? 'Active Now' : 'Offline'}</span>
    </span>
  );
}
