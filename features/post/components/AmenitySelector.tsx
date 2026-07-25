"use client";

import React from 'react';

export interface AmenitySelectorProps {
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
}

const AVAILABLE_AMENITIES = [
  'Wi-Fi',
  'AC',
  'Kitchen',
  'Washing Machine',
  'Power Backup',
  'Gym',
  'Parking',
  '24/7 Security',
  'Swimming Pool',
  'TV',
  'Housekeeping',
  'Balcony',
];

export function AmenitySelector({
  selectedAmenities,
  onChange,
}: AmenitySelectorProps) {
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onChange(selectedAmenities.filter((a) => a !== amenity));
    } else {
      onChange([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-[#0F172A]">
        Amenities Included
      </label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_AMENITIES.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity);

          return (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              aria-pressed={isSelected}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] text-[#128A4E] bg-[#E8F5EE] shadow-2xs font-extrabold'
                  : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'
              }`}
            >
              {amenity} {isSelected ? '✓' : '+'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
