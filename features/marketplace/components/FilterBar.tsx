"use client";

import React from 'react';
import { CategoryFilter, SharingModeFilter } from '../hooks/useMarketplaceFilters';

export interface FilterBarProps {
  category: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  sharingMode: SharingModeFilter;
  onSelectSharingMode: (mode: SharingModeFilter) => void;
  className?: string;
}

export function FilterBar({
  category,
  onSelectCategory,
  sharingMode,
  onSelectSharingMode,
  className = '',
}: FilterBarProps) {
  const categoryPills: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Listings' },
    { key: 'roommates', label: 'Compatible Mates' },
    { key: 'rooms', label: 'Available Rooms' },
    { key: 'my', label: 'My Posted Rooms' },
  ];

  const sharingPills: { key: SharingModeFilter; label: string }[] = [
    { key: '', label: 'All Room Types' },
    { key: 'Private Room', label: 'Private Room' },
    { key: 'Shared Room', label: 'Shared Room' },
    { key: 'Entire Flat', label: 'Entire Flat' },
  ];

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
        {categoryPills.map((pill) => (
          <button
            key={pill.key}
            type="button"
            onClick={() => onSelectCategory(pill.key)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-full border text-xs font-bold transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
              category === pill.key
                ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] font-extrabold shadow-2xs'
                : 'border-gray-200 text-gray-500 bg-white hover:border-gray-300'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Sharing Mode Filter Tags (visible when rooms or all selected) */}
      {(category === 'all' || category === 'rooms') && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sharingPills.map((pill) => (
            <button
              key={pill.key}
              type="button"
              onClick={() => onSelectSharingMode(pill.key)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                sharingMode === pill.key
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE]'
                  : 'border-gray-100 text-gray-500 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
