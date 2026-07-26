"use client";

import React, { useState, useRef, useEffect } from 'react';
const INDIAN_CITIES = ['Bengaluru', 'Delhi', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai']; // TODO: Move to DB

export interface CitySelectorProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  className?: string;
}

export function CitySelector({
  selectedCity,
  onSelectCity,
  className = '',
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select metro city"
        className="h-12 sm:h-14 px-4 bg-[#E8F5EE] border border-[#128A4E]/20 hover:border-[#128A4E]/40 rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#128A4E] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
      >
        <span>📍</span>
        <span>{selectedCity}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[9px] font-bold text-gray-400 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
            SELECT METRO CITY
          </div>
          {INDIAN_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                onSelectCity(city);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer ${
                selectedCity === city
                  ? 'text-[#128A4E] bg-[#E8F5EE]/50 font-extrabold'
                  : 'text-gray-700'
              }`}
            >
              <span>{city}</span>
              {selectedCity === city && (
                <svg className="w-4 h-4 text-[#128A4E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
