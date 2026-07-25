"use client";

import React from 'react';

export interface NearMeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
}

export function NearMeToggle({
  isActive,
  onToggle,
  className = '',
}: NearMeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isActive}
      className={`h-12 sm:h-14 px-4 rounded-2xl border text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
        isActive
          ? 'bg-[#128A4E] text-white border-[#128A4E] shadow-sm'
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      <span>🎯</span>
      <span>{isActive ? 'Near Me Active' : 'Near Me'}</span>
    </button>
  );
}
