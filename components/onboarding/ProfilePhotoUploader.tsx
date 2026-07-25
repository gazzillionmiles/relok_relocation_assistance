"use client";

import React from 'react';
import Image from 'next/image';

export interface ProfilePhotoUploaderProps {
  photoUrl: string;
  onChange: (photoUrl: string) => void;
}

const presetAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
];

export function ProfilePhotoUploader({
  photoUrl,
  onChange,
}: ProfilePhotoUploaderProps) {
  const handleToggleAvatar = () => {
    const currentIndex = presetAvatars.indexOf(photoUrl);
    const nextIndex = (currentIndex + 1) % presetAvatars.length;
    onChange(presetAvatars[nextIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-3 my-2">
      <button
        type="button"
        onClick={handleToggleAvatar}
        className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-[#128A4E] transition-all bg-gray-50 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E]"
        aria-label="Click to toggle profile photo avatar"
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt="Profile Avatar Preview"
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            unoptimized
          />
        ) : (
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}

        {/* Camera Icon Badge */}
        <div className="absolute right-1 bottom-1 bg-[#128A4E] text-white p-2 rounded-full border-2 border-white shadow-sm">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </button>

      <span className="text-xs text-[#6B7280] font-medium">
        Tap avatar to cycle preset profile photos
      </span>
    </div>
  );
}
