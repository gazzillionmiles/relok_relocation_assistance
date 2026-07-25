"use client";

import React, { useState, useEffect, useRef } from 'react';

const LOCALITY_FALLBACKS: Record<string, string[]> = {
  Bengaluru: [
    'HSR Layout, Bengaluru',
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'Whitefield, Bengaluru',
    'Jayanagar, Bengaluru',
    'Bellandur, Bengaluru',
    'Electronic City, Bengaluru',
    'Marathahalli, Bengaluru',
  ],
  Mumbai: [
    'Andheri West, Mumbai',
    'Bandra West, Mumbai',
    'Powai, Mumbai',
    'Juhu, Mumbai',
    'Worli, Mumbai',
    'Goregaon, Mumbai',
    'Khar West, Mumbai',
  ],
  'Delhi NCR': [
    'Saket, New Delhi',
    'Hauz Khas, New Delhi',
    'Greater Kailash, New Delhi',
    'Vasant Kunj, New Delhi',
    'Gurugram Sector 45, NCR',
    'Noida Sector 62, NCR',
  ],
  Pune: [
    'Koregaon Park, Pune',
    'Kalyani Nagar, Pune',
    'Viman Nagar, Pune',
    'Baner, Pune',
    'Kothrud, Pune',
    'Hinjewadi, Pune',
  ],
  Hyderabad: [
    'Gachibowli, Hyderabad',
    'Jubilee Hills, Hyderabad',
    'Madhapur, Hyderabad',
    'Banjara Hills, Hyderabad',
    'Kondapur, Hyderabad',
  ],
};

const FALLBACK_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'HSR Layout, Bengaluru': { lat: 12.9116, lng: 77.6389 },
  'Indiranagar, Bengaluru': { lat: 12.9718, lng: 77.6411 },
  'Koramangala, Bengaluru': { lat: 12.9352, lng: 77.6244 },
  'Whitefield, Bengaluru': { lat: 12.9698, lng: 77.7499 },
  'Andheri West, Mumbai': { lat: 19.1363, lng: 72.8273 },
  'Bandra West, Mumbai': { lat: 19.0544, lng: 72.8294 },
  'Gachibowli, Hyderabad': { lat: 17.4401, lng: 78.3489 },
  'Koregaon Park, Pune': { lat: 18.5362, lng: 73.8930 },
};

export interface GooglePlacesAutocompleteInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string, coords?: { lat: number; lng: number }) => void;
  icon?: React.ReactNode;
  cityContext?: string;
}

export function GooglePlacesAutocompleteInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon,
  cityContext = 'Bengaluru',
}: GooglePlacesAutocompleteInputProps) {
  const [predictions, setPredictions] = useState<{ description: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value || value.trim() === '') {
      setPredictions([]);
      return;
    }

    const query = value.toLowerCase().trim();
    let localities = LOCALITY_FALLBACKS[cityContext] || [];
    if (localities.length === 0) {
      localities = Object.values(LOCALITY_FALLBACKS).flat();
    }

    const matched = localities
      .filter((loc) => loc.toLowerCase().includes(query))
      .map((loc) => ({ description: loc }));

    setPredictions(matched.slice(0, 6));
  }, [value, cityContext]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (description: string) => {
    setIsOpen(false);
    const coords = FALLBACK_COORDINATES[description] || { lat: 12.9116, lng: 77.6389 };
    onChange(description, coords);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 relative" ref={containerRef}>
      <label htmlFor={id || label} className="text-sm font-semibold text-[#0F172A]">
        {label}
      </label>
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id || label}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full h-14 bg-white border border-[#E5E7EB] rounded-xl text-base px-4 ${
            icon ? 'pl-11' : ''
          } focus:outline-none focus:border-[#128A4E] focus:ring-2 focus:ring-[#128A4E]/20 transition-all text-[#0F172A] font-medium placeholder-[#9CA3AF]`}
        />

        {isOpen && predictions.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-50 py-1">
            {predictions.map((pred, index) => (
              <button
                key={index}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(pred.description);
                }}
                onClick={() => handleSelect(pred.description)}
                className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] hover:bg-slate-50 font-medium transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>📍</span>
                <span>{pred.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
