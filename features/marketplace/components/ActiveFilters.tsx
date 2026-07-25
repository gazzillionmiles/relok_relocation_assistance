"use client";

import React from 'react';
import { MarketplaceFiltersState } from '../hooks/useMarketplaceFilters';

export interface ActiveFiltersProps {
  filters: MarketplaceFiltersState;
  onClearSharingMode: () => void;
  onClearNearMe: () => void;
  onClearSearch: () => void;
  onResetAll: () => void;
}

export function ActiveFilters({
  filters,
  onClearSharingMode,
  onClearNearMe,
  onClearSearch,
  onResetAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    !!filters.sharingMode || filters.nearMeActive || !!filters.searchQuery;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1 animate-in fade-in duration-200">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        Active Filters:
      </span>

      {filters.searchQuery && (
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] border border-[#128A4E]/20 text-[#128A4E] text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <span>Search: &quot;{filters.searchQuery}&quot;</span>
          <button
            type="button"
            onClick={onClearSearch}
            className="hover:bg-[#128A4E]/20 rounded-full p-0.5 cursor-pointer"
          >
            ✕
          </button>
        </span>
      )}

      {filters.sharingMode && (
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] border border-[#128A4E]/20 text-[#128A4E] text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <span>Mode: {filters.sharingMode}</span>
          <button
            type="button"
            onClick={onClearSharingMode}
            className="hover:bg-[#128A4E]/20 rounded-full p-0.5 cursor-pointer"
          >
            ✕
          </button>
        </span>
      )}

      {filters.nearMeActive && (
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] border border-[#128A4E]/20 text-[#128A4E] text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
          <span>GPS Near Me</span>
          <button
            type="button"
            onClick={onClearNearMe}
            className="hover:bg-[#128A4E]/20 rounded-full p-0.5 cursor-pointer"
          >
            ✕
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={onResetAll}
        className="text-xs font-bold text-red-600 hover:underline ml-1 cursor-pointer"
      >
        Clear All
      </button>
    </div>
  );
}
