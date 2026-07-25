"use client";

import React from 'react';

export interface LifestyleSelectorProps {
  selectedPrefs: string[];
  onChange: (prefs: string[]) => void;
}

const LIFESTYLE_TRAITS = [
  'Early Bird Preferred',
  'Night Owl Friendly',
  'Spick & Span Clean',
  'Working Professionals Only',
  'Students Welcome',
  'Fitness Enthusiasts',
  'Quiet Work Environment',
];

export function LifestyleSelector({
  selectedPrefs,
  onChange,
}: LifestyleSelectorProps) {
  const toggleTrait = (trait: string) => {
    if (selectedPrefs.includes(trait)) {
      onChange(selectedPrefs.filter((p) => p !== trait));
    } else {
      onChange([...selectedPrefs, trait]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        Flatmate Lifestyle Preferences
      </label>
      <div className="flex flex-wrap gap-2">
        {LIFESTYLE_TRAITS.map((trait) => {
          const isSelected = selectedPrefs.includes(trait);

          return (
            <button
              key={trait}
              type="button"
              onClick={() => toggleTrait(trait)}
              aria-pressed={isSelected}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] shadow-2xs font-extrabold'
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
              }`}
            >
              {trait} {isSelected ? '✓' : '+'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
