"use client";

import React from 'react';

export interface PreferenceSectionProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (val: string) => void;
  helperText?: string;
}

export function PreferenceSection({
  label,
  options,
  selectedValue,
  onSelect,
  helperText,
}: PreferenceSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <label className="text-sm font-semibold text-[#0F172A]">{label}</label>
        {helperText && (
          <span className="text-xs text-[#6B7280] font-normal">{helperText}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const isSelected = selectedValue === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`px-4 py-3 rounded-full border text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] font-bold shadow-2xs'
                  : 'border-[#E5E7EB] text-gray-600 bg-white hover:border-[#CBD5E1]'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
