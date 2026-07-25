"use client";

import React from 'react';
import Image from 'next/image';

export interface ImageUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
}

const PRESET_ROOM_PHOTOS = [
  { label: 'Bedroom', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=600&h=400', icon: '🛏️' },
  { label: 'Living Room', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600&h=400', icon: '🛋️' },
  { label: 'Kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600&h=400', icon: '🍳' },
  { label: 'Washroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600&h=400', icon: '🚿' },
  { label: 'Balcony', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600&h=400', icon: '🌿' },
];

export function ImageUploader({ photos, onChange }: ImageUploaderProps) {
  const togglePhoto = (url: string) => {
    if (photos.includes(url)) {
      if (photos.length > 1) {
        onChange(photos.filter((p) => p !== url));
      }
    } else {
      onChange([...photos, url]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#0F172A]">
          Property Photo Gallery
        </label>
        <span className="text-xs text-gray-500">
          Tap categories to add/remove photos. Select at least 1 photo for your listing.
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {PRESET_ROOM_PHOTOS.map((preset) => {
          const isSelected = photos.includes(preset.url);

          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => togglePhoto(preset.url)}
              aria-pressed={isSelected}
              className={`relative h-28 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] ${
                isSelected
                  ? 'border-[#128A4E] ring-2 ring-[#128A4E]/20 shadow-sm'
                  : 'border-dashed border-gray-200 hover:border-gray-400 bg-gray-50'
              }`}
            >
              {isSelected ? (
                <>
                  <Image
                    src={preset.url}
                    alt={preset.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs flex flex-col items-center justify-center text-white p-2">
                    <span className="text-lg">✓</span>
                    <span className="text-xs font-bold uppercase">{preset.label}</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl">{preset.icon}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">{preset.label}</span>
                  <span className="text-[10px] text-[#128A4E] font-semibold">+ Add Photo</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
