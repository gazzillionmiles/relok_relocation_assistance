"use client";

import React from 'react';
import { INDIAN_CITIES } from '@/data/data';

export interface MultiSelectCitiesProps {
  selectedCities: string[];
  onChange: (cities: string[]) => void;
}

export function MultiSelectCities({
  selectedCities,
  onChange,
}: MultiSelectCitiesProps) {
  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      onChange(selectedCities.filter((c) => c !== city));
    } else {
      onChange([...selectedCities, city]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        Target Metro Cities in India
      </label>
      <div className="flex flex-wrap gap-2.5">
        {INDIAN_CITIES.map((city) => {
          const isSelected = selectedCities.includes(city);

          return (
            <button
              key={city}
              type="button"
              onClick={() => toggleCity(city)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] shadow-2xs font-extrabold'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
              }`}
            >
              {city} {isSelected ? '✓' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
}
