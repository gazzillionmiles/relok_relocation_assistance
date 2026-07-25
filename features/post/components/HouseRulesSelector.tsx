"use client";

import React from 'react';

export interface HouseRulesSelectorProps {
  selectedRules: string[];
  onChange: (rules: string[]) => void;
}

const COMMON_RULES = [
  'No Smoking',
  'No Pets',
  'Vegetarian Only',
  'Guests Allowed',
  'Quiet Hours',
  'No Overnight Stay',
  'Clean Kitchen Policy',
  'Non-Smoker Preferred',
];

export function HouseRulesSelector({
  selectedRules,
  onChange,
}: HouseRulesSelectorProps) {
  const toggleRule = (rule: string) => {
    if (selectedRules.includes(rule)) {
      onChange(selectedRules.filter((r) => r !== rule));
    } else {
      onChange([...selectedRules, rule]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        House Rules
      </label>
      <div className="flex flex-wrap gap-2">
        {COMMON_RULES.map((rule) => {
          const isSelected = selectedRules.includes(rule);

          return (
            <button
              key={rule}
              type="button"
              onClick={() => toggleRule(rule)}
              aria-pressed={isSelected}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] shadow-2xs font-extrabold'
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
              }`}
            >
              {rule} {isSelected ? '✓' : '+'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
