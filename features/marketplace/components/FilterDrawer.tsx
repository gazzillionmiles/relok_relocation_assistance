"use client";

import React from 'react';
import { CategoryFilter, SharingModeFilter } from '../hooks/useMarketplaceFilters';
import { INDIAN_CITIES } from '@/data/data';

export interface FilterDrawerProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  category: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  sharingMode: SharingModeFilter;
  onSelectSharingMode: (mode: SharingModeFilter) => void;
  nearMeActive: boolean;
  onToggleNearMe: () => void;
  minRent: number;
  maxRent: number;
  onResetFilters: () => void;
}

export function FilterDrawer({
  selectedCity,
  onSelectCity,
  category,
  onSelectCategory,
  sharingMode,
  onSelectSharingMode,
  nearMeActive,
  onToggleNearMe,
  onResetFilters,
}: FilterDrawerProps) {
  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-5 sticky top-16">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
          <span>⚙️</span>
          <span>Marketplace Filters</span>
        </h3>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-[11px] font-bold text-[#128A4E] hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>
 
      {/* Metro City Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Metro City Location
        </label>
        <select
          value={selectedCity}
          onChange={(e) => onSelectCity(e.target.value)}
          className="w-full h-9 bg-gray-50 border border-gray-200 rounded-lg px-2.5 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#128A4E]"
        >
          {INDIAN_CITIES.map((city) => (
            <option key={city} value={city}>
              📍 {city}
            </option>
          ))}
        </select>
      </div>
 
      {/* Proximity Near Me Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Proximity Search
        </label>
        <button
          type="button"
          onClick={onToggleNearMe}
          className={`w-full h-9 rounded-lg border text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            nearMeActive
              ? 'bg-[#128A4E] text-white border-[#128A4E]'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <span>🎯</span>
          <span>{nearMeActive ? 'GPS Near Me Active' : 'Sort by Near Me Distance'}</span>
        </button>
      </div>
 
      {/* Category Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-col gap-1">
          {[
            { key: 'all' as CategoryFilter, label: 'All Listings' },
            { key: 'roommates' as CategoryFilter, label: 'Compatible Roommates' },
            { key: 'rooms' as CategoryFilter, label: 'Available Rooms' },
            { key: 'my' as CategoryFilter, label: 'My Posted Rooms' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectCategory(item.key)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                category === item.key
                  ? 'bg-[#E8F5EE] text-[#128A4E] font-extrabold border border-[#128A4E]/20'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
 
      {/* Room Sharing Mode Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Room Sharing Mode
        </label>
        <div className="flex flex-col gap-1">
          {[
            { key: '' as SharingModeFilter, label: 'All Room Types' },
            { key: 'Private Room' as SharingModeFilter, label: 'Private Room' },
            { key: 'Shared Room' as SharingModeFilter, label: 'Shared Room' },
            { key: 'Entire Flat' as SharingModeFilter, label: 'Entire Flat' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectSharingMode(item.key)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                sharingMode === item.key
                  ? 'bg-[#E8F5EE] text-[#128A4E] font-extrabold border border-[#128A4E]/20'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
