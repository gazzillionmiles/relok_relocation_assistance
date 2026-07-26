"use client";

import React from 'react';
const INDIAN_CITIES = ['Bengaluru', 'Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai']; // TODO: Move to DB
import { MatchFilterOptions } from '../lib/match-filters';

export interface MatchFiltersProps {
  filterOptions: MatchFilterOptions;
  onSelectCity: (city: string) => void;
  onMinMatchScoreChange: (score: number) => void;
  onDietaryChange: (diet: string) => void;
  onReset: () => void;
}

export function MatchFilters({
  filterOptions,
  onSelectCity,
  onMinMatchScoreChange,
  onDietaryChange,
  onReset,
}: MatchFiltersProps) {
  return (
    <aside className="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-5 sticky top-16">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
          <span>✨</span>
          <span>Match Filters</span>
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-[11px] font-bold text-[#128A4E] hover:underline cursor-pointer"
        >
          Reset All
        </button>
      </div>
 
      {/* City Location Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Target Metro City
        </label>
        <select
          value={filterOptions.selectedCity}
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
 
      {/* Minimum Score Threshold Slider */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Min Match Score
          </label>
          <span className="font-black text-[#128A4E]">
            {filterOptions.minMatchScore}% +
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={95}
          step={5}
          value={filterOptions.minMatchScore}
          onChange={(e) => onMinMatchScoreChange(Number(e.target.value))}
          className="w-full accent-[#128A4E] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
        />
      </div>
 
      {/* Dietary Preference Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Dietary Alignment
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {['All', 'Veg', 'Non-Veg'].map((diet) => {
            const isSelected = filterOptions.dietaryFilter === diet;
 
            return (
              <button
                key={diet}
                type="button"
                onClick={() => onDietaryChange(diet)}
                className={`py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE]'
                    : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
                }`}
              >
                {diet}
              </button>
            );
          })}
        </div>
      </div>
 
      {/* Matching Stats Card */}
      <div className="bg-[#E8F5EE] border border-[#128A4E]/20 rounded-xl p-3 flex flex-col gap-1 text-[11px]">
        <span className="font-extrabold text-[#128A4E]">💡 Smart Match Engine</span>
        <p className="text-gray-600 font-medium leading-relaxed">
          Matches are automatically computed against your sleep schedule, cleanliness, and dietary habits.
        </p>
      </div>
    </aside>
  );
}
